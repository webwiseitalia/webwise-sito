# Piano: Burger Menu per tutte le pagine

## Problema
Il burger menu mobile funziona solo sulla homepage perché il componente `BurgerMenu` è incluso direttamente in `HomePage` (App.tsx:531). Le altre pagine (ServiziPage, CookiePolicyPage, PrivacyPolicyPage, CareersPage, etc.) usano solo il componente `Navbar` che NON include il burger menu su mobile.

## Soluzione
Aggiungere il componente `BurgerMenu` a tutte le pagine secondarie. Il BurgerMenu è già progettato per funzionare su mobile (linee 90-91 di BurgerMenu.tsx: su mobile è sempre visibile con opacity 1).

## Pagine da modificare
1. **ServiziPage.tsx** - Aggiungere import e componente BurgerMenu
2. **CookiePolicyPage.tsx** - Aggiungere import e componente BurgerMenu
3. **PrivacyPolicyPage.tsx** - Aggiungere import e componente BurgerMenu
4. **CareersPage.tsx** - Aggiungere import e componente BurgerMenu
5. **SoftwarePage.tsx** - Verificare e aggiungere se necessario
6. **ReservlyPage.tsx** - Verificare e aggiungere se necessario
7. **ProjectPage.tsx** - Verificare e aggiungere se necessario

## Modifiche per ogni pagina
1. Aggiungere import: `import BurgerMenu from '../components/BurgerMenu'`
2. Aggiungere componente dopo Navbar: `<BurgerMenu isVisible={true} />`
   - `isVisible={true}` perché su queste pagine non c'è l'effetto scroll della homepage

## Nota sui link del BurgerMenu
I link nel BurgerMenu mobile (linee 121-155) usano ancore come `#hero`, `#servizi`, etc. che funzionano solo in homepage. Per le altre pagine, questi link riporteranno alla homepage con l'ancora corretta - modifichiamo i link per usare percorsi assoluti con ancora (`/#hero`, `/#servizi`, etc.).
