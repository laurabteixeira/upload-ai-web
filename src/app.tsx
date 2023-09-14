import { Wand2 } from 'lucide-react'
import { Button } from "./components/ui/button";
import { Separator } from './components/ui/separator';
import { Textarea } from './components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Slider } from './components/ui/slider';
import { VideoInputForm } from './components/video-input-form';
import { Navbar } from './components/ui/navbar';
import { PromptSelect } from './components/prompt-select';
import { useState } from 'react';
import { useCompletion } from 'ai/react'

export function App() {
  const [temperature, setTemperature] = useState(0.5)
  const [videoId, setVideoId] = useState<string | null>(null)

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: 'http://localhost:3333/ai/complete',
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-type': 'application/json',
    }
  })


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 flex gap-6">
        <div className="flex flex-col flex-1 gap-4">

          <div className="grid grid-rows-2 gap-4 flex-1"> 
            <Textarea 
              className='resize-none p-4 leading-relaxed'
              placeholder='Inclua o prompt para a IA...'
              value={input}
              onChange={handleInputChange}
            />
            <Textarea 
              className='resize-none p-4 leading-relaxed'
              placeholder='Resultado gerado para a IA' 
              readOnly
              value={completion}
              
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Lembrete: você pode utilizar a variável <code className="text-emerald-400">{'{transcription}'}</code> no seu prompt para adicionar o conteúdo da transcrição do vídeo selecionado.
          </p>

        </div>

        <aside className="w-80 space-y-4">
          <VideoInputForm onVideoUploaded={setVideoId}/>
          <Separator />

          <form
            onSubmit={handleSubmit} 
            className="space-y-4"
          >
            <div className="space-y-2">
              <label>Prompt</label>
              <PromptSelect onPromptSelected={setInput}/>
            </div>


            <div className="space-y-2">
              <label>Modelo</label>
              <Select disabled defaultValue='gpt3.5'>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='gpt3.5'>GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className="block text-xs text-muted-foreground italic">Você poderá customizar essa opção em breve.</span>
            </div>

            <Separator/>

            <div className="space-y-2">
              <label>Temperatura</label>
              <Slider
                min={0}
                max={1}
                step={0.1}
                className="cursor-pointer"
                value={[temperature]}
                onValueChange={value => setTemperature(value[0])}
              />
              <span className="block text-xs text-muted-foreground italic">Valores mais altos tendem a deixar o resultado mais criativo, porém mais suscetível a erros! <span style={{fontStyle: 'normal'}}>🔥</span></span>
            </div>

            <Separator/>

            <Button disabled={isLoading} type='submit' className="w-full">Executar <Wand2 className='w-4 h-4 ml-2'/></Button>
          </form>
        </aside>  
      </main>
    </div>
  )
}
