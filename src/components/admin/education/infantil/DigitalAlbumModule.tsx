
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { School, Upload, Image, Users, Bell } from "lucide-react";
import { toast } from "sonner";

const mockClasses = [
  { id: 1, name: "Turma A - Maternal I", count: 15 },
  { id: 2, name: "Turma B - Maternal II", count: 18 },
  { id: 3, name: "Turma C - Pré I", count: 20 },
  { id: 4, name: "Turma D - Pré II", count: 22 },
];

const mockEvents = [
  { id: 1, name: "Festa Junina" },
  { id: 2, name: "Dia da Família" },
  { id: 3, name: "Semana da Criança" },
  { id: 4, name: "Atividades de Arte" },
  { id: 5, name: "Passeio ao Zoológico" },
];

const mockAlbums = [
  { id: 1, title: "Festa Junina 2024", class: "Todas", date: "12/06/2024", photos: 24, consent: "Completo" },
  { id: 2, title: "Atividades de Arte", class: "Turma A - Maternal I", date: "05/06/2024", photos: 12, consent: "Parcial" },
  { id: 3, title: "Passeio ao Zoológico", class: "Turma C - Pré I", date: "20/05/2024", photos: 36, consent: "Completo" },
  { id: 4, title: "Projeto Horta", class: "Turma B - Maternal II", date: "15/05/2024", photos: 8, consent: "Completo" },
];

const DigitalAlbumModule = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [photoFiles, setPhotoFiles] = useState<FileList | null>(null);
  const [notifyParents, setNotifyParents] = useState(true);

  const handleCreateAlbum = () => {
    if (!selectedClass || !albumTitle || !photoFiles) {
      toast.error("Por favor, preencha todos os campos obrigatórios e selecione fotos.");
      return;
    }
    
    toast.success(`Álbum "${albumTitle}" criado com ${photoFiles.length} fotos!`);
    
    // Reset form
    setSelectedClass("");
    setSelectedEvent("");
    setAlbumTitle("");
    setAlbumDescription("");
    setPhotoFiles(null);
    setNotifyParents(true);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <School className="h-5 w-5 mr-2 text-purple-500" />
          Álbum Digital
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Novo Álbum</h3>
            
            <div>
              <Label htmlFor="class-select">Turma</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger id="class-select" className="mt-1">
                  <SelectValue placeholder="Selecione a turma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Turmas</SelectItem>
                  {mockClasses.map(cls => (
                    <SelectItem key={cls.id} value={cls.id.toString()}>
                      {cls.name} ({cls.count} alunos)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="event-select">Evento ou Atividade (opcional)</Label>
              <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                <SelectTrigger id="event-select" className="mt-1">
                  <SelectValue placeholder="Selecione o evento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhum (atividade regular)</SelectItem>
                  {mockEvents.map(event => (
                    <SelectItem key={event.id} value={event.id.toString()}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="album-title">Título do Álbum</Label>
              <Input 
                id="album-title" 
                value={albumTitle} 
                onChange={(e) => setAlbumTitle(e.target.value)}
                placeholder="Ex: Projeto Horta - Maio 2024" 
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="album-desc">Descrição</Label>
              <Textarea 
                id="album-desc" 
                value={albumDescription} 
                onChange={(e) => setAlbumDescription(e.target.value)}
                placeholder="Descreva o contexto das fotos e as atividades realizadas" 
                className="mt-1"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="photo-upload">Enviar Fotos</Label>
              <div className="mt-1 border-2 border-dashed border-gray-300 p-6 rounded-lg text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">Arraste as fotos ou clique para selecionar</p>
                <p className="text-xs text-gray-400 mt-1">Formatos aceitos: JPG, PNG. Máximo 20MB por foto</p>
                <Input 
                  id="photo-upload" 
                  type="file" 
                  multiple
                  accept="image/*"
                  onChange={(e) => setPhotoFiles(e.target.files)}
                  className="mt-4"
                />
                {photoFiles && (
                  <p className="mt-2 text-sm font-medium text-education-primary">
                    {photoFiles.length} {photoFiles.length === 1 ? 'foto selecionada' : 'fotos selecionadas'}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input 
                id="notify-parents" 
                type="checkbox" 
                checked={notifyParents} 
                onChange={(e) => setNotifyParents(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-education-primary focus:ring-education-primary"
              />
              <Label htmlFor="notify-parents" className="text-sm font-normal">
                Notificar responsáveis sobre o novo álbum
              </Label>
            </div>
            
            <Button onClick={handleCreateAlbum} className="w-full">
              <Image className="h-4 w-4 mr-2" />
              Criar Álbum
            </Button>

            <div className="mt-2 p-3 bg-amber-50 border border-amber-100 rounded-md">
              <p className="text-xs text-amber-700">
                <strong>Observação:</strong> O sistema irá filtrar automaticamente crianças sem autorização dos pais para divulgação de imagens.
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Álbuns Recentes</h3>
            <div className="space-y-3">
              {mockAlbums.map(album => (
                <div key={album.id} className="p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{album.title}</h4>
                      <p className="text-xs text-gray-500">
                        {album.class} • {album.date}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                        {album.photos} fotos
                      </span>
                      <span className={`px-2 py-1 rounded-md text-xs ${
                        album.consent === "Completo" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {album.consent}
                      </span>
                    </div>
                  </div>
                  <div className="flex mt-3 space-x-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Users className="h-3 w-3 mr-1" />
                      Gerenciar Consentimentos
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Bell className="h-3 w-3 mr-1" />
                      Notificar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DigitalAlbumModule;
