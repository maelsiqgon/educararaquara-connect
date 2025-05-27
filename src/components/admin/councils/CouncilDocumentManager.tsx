
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { FileText, Upload, Download, Trash2, Plus, Calendar, User } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

interface CouncilDocument {
  id: string;
  council_id: string;
  title: string;
  description: string;
  document_type: string;
  file_path: string;
  file_size: number;
  year: number;
  month: number;
  meeting_date: string;
  uploaded_by: string;
  created_at: string;
  uploader?: {
    name: string;
  };
}

interface CouncilDocumentManagerProps {
  councilId: string;
  councilName: string;
}

const CouncilDocumentManager: React.FC<CouncilDocumentManagerProps> = ({ councilId, councilName }) => {
  const [documents, setDocuments] = useState<CouncilDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    document_type: 'ata',
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    meeting_date: new Date().toISOString().split('T')[0]
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const documentTypes = [
    { value: 'ata', label: 'Ata de Reunião' },
    { value: 'balancete', label: 'Balancete' },
    { value: 'relatorio', label: 'Relatório' },
    { value: 'parecer', label: 'Parecer' },
    { value: 'outros', label: 'Outros' }
  ];

  useEffect(() => {
    if (councilId) {
      fetchDocuments();
    }
  }, [councilId]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('council_documents')
        .select(`
          *,
          uploader:profiles!uploaded_by(name)
        `)
        .eq('council_id', councilId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error('Erro ao carregar documentos');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !formData.title.trim()) {
      toast.error('Arquivo e título são obrigatórios');
      return;
    }

    try {
      setUploading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      // Upload file to storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `council_${councilId}_${Date.now()}.${fileExt}`;
      const filePath = `councils/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      // Save document metadata
      const { error: dbError } = await supabase
        .from('council_documents')
        .insert([{
          council_id: councilId,
          title: formData.title,
          description: formData.description,
          document_type: formData.document_type,
          file_path: publicUrl,
          file_size: selectedFile.size,
          year: formData.year,
          month: formData.month,
          meeting_date: formData.meeting_date,
          uploaded_by: user.id
        }]);

      if (dbError) throw dbError;

      toast.success('Documento enviado com sucesso!');
      setShowForm(false);
      setSelectedFile(null);
      setFormData({
        title: '',
        description: '',
        document_type: 'ata',
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        meeting_date: new Date().toISOString().split('T')[0]
      });
      fetchDocuments();
    } catch (error) {
      console.error('Error uploading document:', error);
      toast.error('Erro ao enviar documento');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, filePath: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este documento?')) return;

    try {
      // Extract storage path from URL
      const pathParts = filePath.split('/');
      const storagePath = pathParts.slice(-2).join('/');

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([storagePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('council_documents')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      toast.success('Documento excluído com sucesso!');
      fetchDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error('Erro ao excluir documento');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getDocumentTypeLabel = (type: string) => {
    const docType = documentTypes.find(t => t.value === type);
    return docType?.label || type;
  };

  if (showForm) {
    return (
      <Card className="border-0 shadow-soft">
        <CardHeader className="bg-education-light rounded-t-lg">
          <CardTitle className="text-education-primary">Upload de Documento</CardTitle>
          <CardDescription>
            Adicionar novo documento ao {councilName}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Título do Documento *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Ex: Ata da Reunião de Janeiro 2025"
              />
            </div>

            <div className="space-y-2">
              <Label>Tipo de Documento</Label>
              <Select 
                value={formData.document_type} 
                onValueChange={(value) => setFormData({...formData, document_type: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Ano</Label>
                <Input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Mês</Label>
                <Select 
                  value={formData.month.toString()} 
                  onValueChange={(value) => setFormData({...formData, month: parseInt(value)})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({length: 12}, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {new Date(0, i).toLocaleDateString('pt-BR', { month: 'long' })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Data da Reunião</Label>
                <Input
                  type="date"
                  value={formData.meeting_date}
                  onChange={(e) => setFormData({...formData, meeting_date: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Arquivo *</Label>
              <Input
                type="file"
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
              />
              {selectedFile && (
                <p className="text-sm text-gray-600">
                  Arquivo selecionado: {selectedFile.name} ({formatFileSize(selectedFile.size)})
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleUpload} 
                disabled={uploading || !selectedFile}
                className="bg-education-primary hover:bg-education-dark"
              >
                {uploading ? 'Enviando...' : 'Enviar Documento'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <CardTitle className="text-education-primary flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Documentos - {councilName}
        </CardTitle>
        <CardDescription>
          Gestão de documentos e atas do conselho
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Documentos</h3>
            <Button onClick={() => setShowForm(true)} className="bg-education-primary hover:bg-education-dark">
              <Plus className="h-4 w-4 mr-2" />
              Novo Documento
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-8">Carregando documentos...</div>
          ) : (
            <div className="space-y-4">
              {documents.map((doc) => (
                <Card key={doc.id} className="border">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{doc.title}</h4>
                          <Badge variant="outline">
                            {getDocumentTypeLabel(doc.document_type)}
                          </Badge>
                        </div>
                        
                        {doc.description && (
                          <p className="text-gray-600 mb-3">{doc.description}</p>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{doc.month}/{doc.year}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span>{formatFileSize(doc.file_size)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{doc.uploader?.name || 'Usuário'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(doc.created_at).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => window.open(doc.file_path, '_blank')}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(doc.id, doc.file_path)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {documents.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhum documento encontrado</p>
                  <Button 
                    onClick={() => setShowForm(true)} 
                    className="mt-4 bg-education-primary hover:bg-education-dark"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Primeiro Documento
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CouncilDocumentManager;
