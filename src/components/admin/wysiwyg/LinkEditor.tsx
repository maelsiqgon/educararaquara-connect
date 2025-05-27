
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface LinkEditorProps {
  onInsert: (url: string, text: string, newTab: boolean) => void;
  onClose: () => void;
  initialText?: string;
}

const LinkEditor: React.FC<LinkEditorProps> = ({
  onInsert,
  onClose,
  initialText = "",
}) => {
  const [url, setUrl] = useState("https://");
  const [text, setText] = useState(initialText);
  const [openInNewTab, setOpenInNewTab] = useState(true);

  useEffect(() => {
    setText(initialText || "");
  }, [initialText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onInsert(url, text, openInNewTab);
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Inserir Link</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="link-url">URL</Label>
            <Input
              id="link-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://exemplo.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="link-text">Texto do Link</Label>
            <Input
              id="link-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Clique aqui"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="new-tab"
              checked={openInNewTab}
              onCheckedChange={(checked) => setOpenInNewTab(checked as boolean)}
            />
            <Label htmlFor="new-tab" className="cursor-pointer">
              Abrir em uma nova aba
            </Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Inserir Link</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LinkEditor;
