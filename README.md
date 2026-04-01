# Outil J — Calculateur de gain CRO

## Nom public
**"Que vaut une amélioration de ta page en euros ?"**
Slug suggéré : `/outils/gain-cro`

## Résumé
Traduit une amélioration du taux de conversion en impact direct sur le CPA, le ROAS et le CA mensuel — pour montrer en euros ce que vaut un travail CRO sur les landing pages, et le comparer à une augmentation de budget équivalente.

## Cible principale
Profil 1 — E-commerce en croissance
Profil 2 — Scale-up / PME B2B lead gen

## Douleur adressée
Les annonceurs investissent dans les campagnes, jamais dans les pages. Le CRO est perçu comme coûteux et incertain. Personne ne leur a jamais montré que passer de 1,5% à 2,5% de taux de conversion, c'est souvent plus rentable que doubler le budget Ads.

## Accroche
> "Et si améliorer ta page d'1 point de conversion valait mieux que 5 000€ de budget Ads supplémentaire ?"

## Comment ça marche

### Inputs
| Champ | Type | Exemple | Requis |
|---|---|---|---|
| Budget Ads mensuel | € | 8 000 € | Oui |
| Sessions mensuelles sur la landing page | nombre | 12 000 | Oui |
| Taux de conversion actuel | % | 1.5% | Oui |
| Taux de conversion cible | % | 2.5% | Oui |
| Panier moyen ou valeur d'un lead | € | 95 € | Oui |

### Formules
```
// Situation actuelle
conversions_actuelles = sessions × (taux_actuel / 100)
CA_actuel = conversions_actuelles × valeur
CPA_actuel = budget / conversions_actuelles
ROAS_actuel = CA_actuel / budget

// Situation après CRO
conversions_cro = sessions × (taux_cible / 100)
CA_cro = conversions_cro × valeur
CPA_cro = budget / conversions_cro
ROAS_cro = CA_cro / budget

// Gains
gain_conversions = conversions_cro - conversions_actuelles
gain_CA = CA_cro - CA_actuel
gain_ROAS = ROAS_cro - ROAS_actuel

// Équivalent budget (l'argument clé)
// "Pour obtenir conversions_cro avec le taux_actuel, il faudrait dépenser X€"
budget_equivalent = conversions_cro / (taux_actuel / 100) × (budget / sessions)
// Simplifié : budget_equivalent = budget × (taux_cible / taux_actuel)
économie_budget = budget_equivalent - budget
```

### Outputs
**Tableau avant / après**
| Métrique | Avant CRO | Après CRO | Gain |
|---|---|---|---|
| Conversions/mois | X | Y | +Z |
| CA mensuel | X€ | Y€ | +Z€ |
| CPA | X€ | Y€ | -Z€ |
| ROAS | X | Y | +Z |

**Mise en avant principale — L'équivalent budget**
Grand format, mis en valeur visuellement :
> "Pour obtenir le même résultat en augmentant ton budget plutôt qu'en améliorant ta page, il aurait fallu dépenser **X€ de plus par mois**."

**Phrase d'impact auto-générée**
> "Améliorer ton taux de conversion de 1.5% à 2.5% te rapporte 1 140€/mois de CA supplémentaire — sans augmenter ton budget d'un euro."

## UX & Copywriting

### Headline
> "Et si améliorer ta page rapportait plus que 5 000€ de budget Ads en plus ?"

### Sous-titre
> "Entre tes chiffres. On calcule ce que vaut chaque point de taux de conversion — en euros, pas en statistiques."

### Valeurs par défaut pré-remplies
L'outil s'affiche avec des valeurs types dès l'arrivée :
- Budget : 8 000€ / Sessions : 12 000 / Taux actuel : 1.5% / Taux cible : 2.5% / Valeur : 95€
→ Le résultat est visible AVANT que l'utilisateur ait tapé quoi que ce soit
→ Il comprend immédiatement ce qu'il va obtenir et personnalise ensuite

### Labels & placeholders
- "Ton budget Ads mensuel (€)" — placeholder : "Ex : 8 000"
- "Visites mensuelles sur ta page" — tooltip : "Dans GA4 → Pages et écrans → cherche l'URL de ta landing page → colonne Sessions" — placeholder : "Ex : 12 000"
- "Taux de conversion actuel (%)" — slider de 0 à 15%, valeur par défaut 1.5%
- "Taux de conversion que tu vises (%)" — slider de 0 à 15%, valeur par défaut 2.5%
- "Valeur d'une conversion (€)" — tooltip : "Panier moyen pour un e-com, valeur d'un lead pour un B2B" — placeholder : "Ex : 95"

### Aha moment
L'équivalent budget en très grand, fond jaune `#fff8e5` :
"Pour obtenir ce même résultat en augmentant ton budget plutôt qu'en améliorant ta page, il t'aurait fallu **4 200€ de plus par mois**."

### Règles UX
- Résultat visible par défaut dès l'arrivée (valeurs pré-remplies)
- Sliders pour les taux de conversion — plus intuitif que des champs numériques
- Calcul en temps réel à chaque glissement du slider
- CTA texte : "Tu veux savoir quoi améliorer en priorité sur ta page ?"

## Edge cases
- Taux cible ≤ Taux actuel → message "Le taux cible doit être supérieur au taux actuel"
- Taux cible > 30% → avertissement "Un taux supérieur à 30% est rare — vérifie tes chiffres"
- Sessions = 0 → erreur
- Gain CA très faible (< 100€) → afficher quand même mais contextualiser

## Angle différenciant
Traduit le CRO dans la langue du business. Élimine l'objection "le CRO c'est cher et incertain" en montrant que l'inaction a elle aussi un coût mesurable.

## Stack technique
- Vite + React
- CSS pur (pas de Tailwind — suivre la charte graphique Lutie)
- Calcul en temps réel via useState / useEffect
- Pas de backend, pas de routing (single component app)

## Design & UI
Respecter la charte graphique Lutie (`CHARTE_GRAPHIQUE_LUTIE.md`) :
- L'équivalent budget : chiffre en grand, fond `#fff8e5`, couleur `#fcb800` — c'est l'élément le plus visible
- Sliders : couleur de remplissage `#fcb800`
- Tableau avant/après : colonne "Gain" en vert ou jaune
- Police Plus Jakarta Sans

## CTA
Texte : "Tu veux savoir sur quoi travailler en priorité sur ta page ?"
Destination : page de prise de contact / calendly Lutie

## Statut
- [ ] Maquette
- [ ] Développement
- [ ] Mise en ligne
