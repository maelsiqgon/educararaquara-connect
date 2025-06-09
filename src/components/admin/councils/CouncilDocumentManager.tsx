
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CouncilDocument {
  id: string;
  council_id: string;
  title: string;
  document_type: string;
  file_path: string;
  file_size: number;
  meeting_date: string;
  year: number;
  month: number;
  description: string;
  uploaded_by: string;
  created_at: string;
}

const CouncilDocumentManager: React.FC = () => {
  const [documents, setDocuments] = useState<CouncilDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('council_documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Convert data to match our interface
      const formattedDocuments: CouncilDocument[] = data.map(doc => ({
        id: doc.id,
        council_id: doc.council_id,
        title: doc.title,
        document_type: doc.document_type,
        file_path: doc.file_path,
        file_size: doc.file_size,
        meeting_date: doc.meeting_date,
        year: doc.year,
        month: doc.month,
        description: doc.description,
        uploaded_by: doc.uploaded_by,
        created_at: doc.created_at
      }));
      
      setDocuments(formattedDocuments);
    } catch (error: any) {
      console.error('Error fetching documents:', error);
      toast.error('Erro ao carregar documentos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.document_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Documentos dos Conselhos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-education-primary"></div>
            <span className="ml-2">Carregando...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentos dos Conselhos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <Input
            placeholder="Buscar documentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button onClick={fetchDocuments}>
            Atualizar
          </Button>
        </div>

        <div className="space-y-2">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-medium">{doc.title}</p>
                  <p className="text-sm text-gray-500">{doc.description}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(doc.created_at).toLocaleDateString('pt-BR')} - {formatFileSize(doc.file_size)}
                  </p>
                </div>
                <Badge variant="outline">
                  {doc.document_type}
                </Badge>
                <Badge variant="secondary">
                  {doc.year}/{doc.month}
                </Badge>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  Download
                </Button>
                <Button size="sm" variant="outline">
                  Editar
                </Button>
              </div>
            </div>
          ))}

          {filteredDocuments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum documento encontrado
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CouncilDocumentManager;
