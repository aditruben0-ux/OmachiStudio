"use client"
import { useState } from "react"

export default function OmachiStudio() {
  const [prompt, setPrompt] = useState("A serene Japanese temple at sunrise, monks walking, cherry blossoms falling")
  const [mode, setMode] = useState("video")
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const generate = async () => {
    setGenerating(true)
    setResult(null)
    await new Promise(r => setTimeout(r, 2000))
    setResult(mode==="image" ? `https://picsum.photos/seed/${prompt.length}/1024/576` : "VIDEO_READY")
    setGenerating(false)
  }

  return (
    <div style={{minHeight:"100vh", background:"#0a0a0a", color:"white", position:"relative", overflow:"hidden"}}>
      <div style={{position:"absolute", inset:0, backgroundImage:"url(https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=2000)", backgroundSize:"cover", backgroundPosition:"center", opacity:0.25}}/>
      <div style={{position:"relative", maxWidth:900, margin:"0 auto", padding:"40px 20px"}}>
        <h1 style={{fontSize:52, fontWeight:900}}>OMACHI <span style={{color:"#ff3b30"}}>STUDIO</span></h1>
        <p style={{opacity:0.7}}>Type anything. Watch it become video.</p>
        <div style={{marginTop:32, background:"rgba(255,255,255,0.08)", backdropFilter:"blur(10px)", borderRadius:20, padding:24, border:"1px solid rgba(255,255,255,0.15)"}}>
          <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} style={{width:"100%", height:120, background:"rgba(0,0,0,0.5)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:12, padding:16, color:"white", fontSize:18, outline:"none"}} />
          <div style={{display:"flex", gap:12, marginTop:16}}>
            <button onClick={()=>setMode("image")} style={{flex:1, padding:14, borderRadius:12, border:"1px solid rgba(255,255,255,0.2)", background: mode==="image"?"white":"transparent", color: mode==="image"?"black":"white", fontWeight:700}}>IMAGE</button>
            <button onClick={()=>setMode("video")} style={{flex:1, padding:14, borderRadius:12, border:"1px solid #ff3b30", background: mode==="video"?"#ff3b30":"transparent", color:"white", fontWeight:700}}>VIDEO</button>
          </div>
          <button onClick={generate} style={{width:"100%", marginTop:16, padding:16, borderRadius:12, background:"white", color:"black", fontWeight:900, fontSize:18}}>{generating ? "GENERATING..." : `GENERATE ${mode.toUpperCase()}`}</button>
        </div>
        {result && <div style={{marginTop:24, background:"rgba(255,255,255,0.08)", borderRadius:20, padding:20, textAlign:"center"}}>{result==="VIDEO_READY" ? <div>🎬 Video Generated!<br/><br/><b>{prompt}</b></div> : <img src={result} style={{width:"100%", borderRadius:12}}/>}</div>}
      </div>
    </div>
  )
      }
