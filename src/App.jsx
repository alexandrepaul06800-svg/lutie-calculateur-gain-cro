import { useState, useMemo, useEffect, useRef } from "react"
import Lottie from "lottie-react"
import "./index.css"
import "./App.css"

function LottieBtn({ href, label }) {
  const [animData, setAnimData] = useState(null)
  const lottieRef = useRef(null)

  useEffect(() => {
    fetch("/lottie-btn.json")
      .then((r) => r.json())
      .then(setAnimData)
      .catch(() => {})
  }, [])

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn--primary lottie-btn"
      onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.stop()}
    >
      {animData && (
        <Lottie
          lottieRef={lottieRef}
          animationData={animData}
          autoplay={false}
          loop={true}
          style={{ width: 24, height: 24 }}
        />
      )}
      {label}
    </a>
  )
}

function fmt(n) {
  if (n === null || n === undefined || isNaN(n) || !isFinite(n)) return "—"
  return Number(n).toLocaleString("fr-FR", { maximumFractionDigits: 0 }) + " €"
}

function fmtNum(n, decimals = 2) {
  if (n === null || n === undefined || isNaN(n) || !isFinite(n)) return "—"
  return Number(n).toLocaleString("fr-FR", { maximumFractionDigits: decimals })
}

export default function App() {
  const [budget, setBudget] = useState(8000)
  const [sessions, setSessions] = useState(12000)
  const [tauxActuel, setTauxActuel] = useState(1.5)
  const [tauxCible, setTauxCible] = useState(2.5)
  const [valeur, setValeur] = useState(95)

  const ta = Number(tauxActuel)
  const tc = Number(tauxCible)
  const errorTaux = tc > 0 && ta > 0 && tc <= ta
  const warnTaux = tc > 30

  const calc = useMemo(() => {
    const b = Number(budget)
    const s = Number(sessions)
    const v = Number(valeur)

    if (!b || !s || !ta || !tc || !v || ta <= 0 || tc <= ta) return null

    const conversions_actuelles = s * (ta / 100)
    const CA_actuel = conversions_actuelles * v
    const CPA_actuel = b / conversions_actuelles
    const ROAS_actuel = CA_actuel / b

    const conversions_cro = s * (tc / 100)
    const CA_cro = conversions_cro * v
    const CPA_cro = b / conversions_cro
    const ROAS_cro = CA_cro / b

    const gain_conversions = conversions_cro - conversions_actuelles
    const gain_CA = CA_cro - CA_actuel
    const budget_equivalent = b * (tc / ta)
    const economie_budget = budget_equivalent - b

    return {
      conversions_actuelles,
      CA_actuel,
      CPA_actuel,
      ROAS_actuel,
      conversions_cro,
      CA_cro,
      CPA_cro,
      ROAS_cro,
      gain_conversions,
      gain_CA,
      budget_equivalent,
      economie_budget,
    }
  }, [budget, sessions, ta, tc, valeur])

  const hasResults = calc !== null

  return (
    <div className="tool-wrapper">
      <div className="grain-overlay" />
      <div className="tool-container">

        {/* Header */}
        <header className="tool-header">
          <a href="https://lutie.webflow.io" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn.prod.website-files.com/68b6be52d4cf251987cb0b82/68b7ba9e3b082f85f53e7e3e_lutie-logo.svg"
              alt="Lutie"
              height="32"
            />
          </a>
        </header>

        {/* Hero */}
        <div className="hero-section">
          <h1 className="hero-title">
            Et si améliorer ta page rapportait plus que{" "}
            <span className="highlight">5 000 € de budget Ads en plus</span>&nbsp;?
          </h1>
          <p className="hero-subtitle">
            Entre tes chiffres. On calcule ce que vaut chaque point de taux de conversion — en euros, pas en statistiques.
          </p>
        </div>

        {/* Main layout */}
        <div className="cro-layout">

          {/* Inputs */}
          <div className="card inputs-card">
            <h3 className="card-section-title">Tes chiffres</h3>

            <div className="input-group">
              <label className="input-label">Budget Ads mensuel</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  min="0"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="8000"
                />
                <span className="unit">€</span>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Sessions / mois sur la page</label>
              <input
                type="number"
                min="0"
                value={sessions}
                onChange={(e) => setSessions(e.target.value)}
                placeholder="12000"
              />
            </div>

            <div className="input-group">
              <label className="input-label">
                Taux de conversion actuel — <strong>{tauxActuel}%</strong>
              </label>
              <input
                type="range"
                min="0.1"
                max="15"
                step="0.1"
                value={tauxActuel}
                onChange={(e) => setTauxActuel(Number(e.target.value))}
              />
              <div className="slider-bounds">
                <span>0.1%</span>
                <span>15%</span>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">
                Taux de conversion cible — <strong>{tauxCible}%</strong>
              </label>
              <input
                type="range"
                min="0.1"
                max="15"
                step="0.1"
                value={tauxCible}
                onChange={(e) => setTauxCible(Number(e.target.value))}
              />
              <div className="slider-bounds">
                <span>0.1%</span>
                <span>15%</span>
              </div>
              {errorTaux && (
                <p className="error-msg">Le taux cible doit être supérieur au taux actuel.</p>
              )}
              {warnTaux && !errorTaux && (
                <p className="warning-msg">Un taux &gt; 30% est exceptionnel — vérifie tes données.</p>
              )}
            </div>

            <div className="input-group mb-0">
              <label className="input-label">Valeur d'une conversion</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  min="0"
                  value={valeur}
                  onChange={(e) => setValeur(e.target.value)}
                  placeholder="95"
                />
                <span className="unit">€</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="results-col">
            {hasResults ? (
              <>
                {/* AHA MOMENT */}
                <div className="card card--highlight aha-card">
                  <p className="aha-eyebrow">Équivalent en budget Ads supplémentaire</p>
                  <div className="metric-big aha-number">
                    + {fmtNum(calc.economie_budget, 0)} €
                  </div>
                  <p className="aha-desc">
                    Pour obtenir ce même résultat en augmentant ton budget plutôt qu'en améliorant ta page, il t'aurait fallu{" "}
                    <strong>{fmtNum(calc.economie_budget, 0)} € de plus par mois</strong>.
                  </p>
                </div>

                {/* Auto-phrase */}
                <div className="card card--alert phrase-card">
                  <p className="phrase-text">
                    Améliorer ton taux de conversion de{" "}
                    <strong>{tauxActuel}%</strong> à{" "}
                    <strong>{tauxCible}%</strong> te rapporte{" "}
                    <span className="phrase-amount">{fmtNum(calc.gain_CA, 0)} €/mois</span>{" "}
                    de CA supplémentaire — sans augmenter ton budget d'un euro.
                  </p>
                </div>

                {/* Before/After Table */}
                <div className="card">
                  <h4 className="table-title">Avant / Après CRO</h4>
                  <div className="comparison-table">
                    <div className="table-head">
                      <div className="col-metric"></div>
                      <div className="col-val">Avant</div>
                      <div className="col-val">Après</div>
                      <div className="col-gain">Gain</div>
                    </div>
                    <div className="table-row">
                      <div className="col-metric">Conversions / mois</div>
                      <div className="col-val">{fmtNum(calc.conversions_actuelles, 1)}</div>
                      <div className="col-val">{fmtNum(calc.conversions_cro, 1)}</div>
                      <div className="col-gain gain-positive">+{fmtNum(calc.gain_conversions, 1)}</div>
                    </div>
                    <div className="table-row">
                      <div className="col-metric">CA mensuel</div>
                      <div className="col-val">{fmt(calc.CA_actuel)}</div>
                      <div className="col-val">{fmt(calc.CA_cro)}</div>
                      <div className="col-gain gain-positive">+{fmt(calc.gain_CA)}</div>
                    </div>
                    <div className="table-row">
                      <div className="col-metric">CPA</div>
                      <div className="col-val">{fmt(calc.CPA_actuel)}</div>
                      <div className="col-val">{fmt(calc.CPA_cro)}</div>
                      <div className="col-gain gain-positive">-{fmt(calc.CPA_actuel - calc.CPA_cro)}</div>
                    </div>
                    <div className="table-row">
                      <div className="col-metric">ROAS</div>
                      <div className="col-val">{fmtNum(calc.ROAS_actuel, 2)}x</div>
                      <div className="col-val">{fmtNum(calc.ROAS_cro, 2)}x</div>
                      <div className="col-gain gain-positive">+{fmtNum(calc.ROAS_cro - calc.ROAS_actuel, 2)}x</div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="cta-section">
                  <p className="cta-question">
                    Tu veux savoir sur quoi travailler en priorité sur ta page ?
                  </p>
                  <LottieBtn
                    href="https://lutie.webflow.io/contact"
                    label="Parler à un expert CRO →"
                  />
                </div>
              </>
            ) : (
              <div className="card card--neutral empty-state">
                <div className="empty-icon">📊</div>
                <p>Remplis les champs pour voir tes résultats en temps réel.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="tool-footer">
          <a href="https://lutie.webflow.io" target="_blank" rel="noopener noreferrer">Lutie</a>
          {" "}— Agence Google Ads &amp; Meta Ads
        </footer>
      </div>
    </div>
  )
}
