import { Github, Rabbit } from "lucide-react";
import { Separator } from "./separator";
import { Button } from "./button";

export function Navbar () {
  return (
    <div className="px-6 py-3 flex items-center justify-between border-b">
      <h1 className="text-xl font-bold flex gap-2">
        upload.ai
        <Rabbit color='#4ade80'/>
      </h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Desenvolvido com 💚 no NLW da Rocketseat.</span>
        <Separator orientation='vertical' className="h-6"/>
        <Button variant={"outline"}>
          <Github className="w-4 h-4 mr-2"/>
          GitHub
        </Button>
      </div>
    </div>
  )
}