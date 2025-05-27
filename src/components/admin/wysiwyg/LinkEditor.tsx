
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface LinkEditorProps {
  onInsert: (url: string, text: string, newTab: boolean) => void;
  onClose: () => void;
  initialText?: string;
}

const LinkEditor: React.FC<LinkEditorProps> = ({
  onInsert,
  onClose,
  initialText = ""
}) => {
  const [url, setUrl] = useState("");
  const [text, setText] = useState(initialText);
  const [newTab, setNewTab] = useState(true);

  const handleInsert = () => {
    if (!url || !text) return;
    onInsert(url, text, newTab);
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Inserir Link</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="link-url">URL</Label>
            <Input
              id="link-url"
              placeholder="https://exemplo.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="link-text">Texto do Link</Label>
            <Input
              id="link-text"
              placeholder="Texto que aparecerá no link"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="new-tab"
              checked={newTab}
              onCheckedChange={setNewTab}
            />
            <Label htmlFor="new-tab">Abrir em nova aba</Label>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleInsert} disabled={!url || !text}>
            Inserir Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LinkEditor;
