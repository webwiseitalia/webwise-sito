# Piano: Aggiunta sezione "Lavori Custom" nella sottosezione Servizi 1

## Obiettivo
Aggiungere a destra del logo Webwise (nella sezione servizi1) una linea orizzontale che arriva fino al bordo destro delle card, con sopra una scritta sui lavori custom e un CTA "Contattaci" con freccia a 45°.

## Struttura attuale
- **Sezione servizi1**: contiene solo il logo Webwise (125x125px) posizionato in alto a sinistra con sticky
- Il logo è dentro un container `max-w-7xl mx-auto px-8`

## Modifiche da effettuare

### 1. Modificare il layout del container del logo
Trasformare il div che contiene il logo in un layout flex orizzontale con:
- Logo a sinistra (come ora)
- Nuovo contenuto a destra con flex-grow per occupare lo spazio rimanente

### 2. Aggiungere il nuovo blocco a destra del logo
Struttura del nuovo blocco:
```
[Logo] -------- [Scritta + CTA] --------
        linea orizzontale che connette
```

Elementi:
- **Linea orizzontale**: `border-t border-white/30` o simile, che si estende da dopo il logo fino alla fine
- **Scritta**: Testo tipo "Realizziamo anche progetti custom su misura" - posizionato sopra la linea
- **CTA**: Link "Contattaci" con freccia a 45° (stile navbar: sfondo trasparente, icona arrow-up-right)

### 3. Stile del CTA
Copiare lo stile dalla navbar:
- Testo bianco
- Freccia a 45° (arrow-up-right icon)
- Hover con cambio colore a cyan

## File da modificare
- `/src/App.tsx` - sezione servizi1 (righe ~500-519)

## Codice proposto

```jsx
{/* Logo + Linea con scritta custom */}
<div ref={serviziBlockRef} className="sticky flex items-center gap-6" style={{ top: '20vh', paddingTop: '20px' }}>
  {/* Logo */}
  <img
    src={logoWebwiseCenter}
    alt="Webwise Logo"
    className="invert flex-shrink-0"
    style={{
      width: '125px',
      height: '125px',
      opacity: 0,
    }}
  />

  {/* Blocco destro: scritta + linea + CTA */}
  <div className="flex-grow flex flex-col justify-center">
    {/* Riga con scritta e CTA */}
    <div className="flex items-center justify-between mb-2">
      <p className="text-white/70 text-sm">
        Realizziamo anche progetti custom su misura
      </p>
      <a
        href="#contatti"
        className="flex items-center gap-1.5 text-white text-sm hover:text-[#2EBAEB] transition-colors"
      >
        <span>Contattaci</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </a>
    </div>

    {/* Linea orizzontale */}
    <div className="w-full h-px bg-white/30" />
  </div>
</div>
```

## Note
- La linea si estenderà automaticamente fino al bordo del container (che è allineato con le card)
- Il CTA usa l'icona `arrow-up-right` (freccia diagonale a 45°)
- Lo stile è minimalista e coerente con il resto del sito
