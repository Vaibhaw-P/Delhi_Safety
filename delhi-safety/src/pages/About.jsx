import { ShieldCheck, Users, MapPinned, AlertTriangle, Scale, Lock } from 'lucide-react'
import useInView from '../hooks/useInView.js'

function RevealCard({ children }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={`reveal ${inView ? 'in-view' : ''}`}>
      {children}
    </div>
  )
}

export default function About() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">About This Platform</h1>
          <p className="page-subtitle">Our perspective on safety, tourism, and public space intelligence in Delhi NCR</p>
        </div>
      </div>

      <div className="prose anim-in" style={{ marginBottom: 32 }}>
        <p>
          Delhi Safety Risk Intelligence exists to turn scattered crime data into something a
          traveler, a resident, or a city planner can actually act on before they step into a
          neighborhood — not after. We built it around one belief: safety information should be
          specific, current, and honest about its limits, rather than a vague reputation passed
          along by word of mouth.
        </p>
        <p>
          The platform combines historical incident patterns, location context (footfall, lighting,
          transit proximity, time-of-day risk), and machine learning models to estimate a safety
          score for tourist sites, markets, transit hubs, and public areas across Delhi NCR. It is
          designed to sit inside a larger ERP or public-safety system, not to replace policing,
          verified emergency services, or on-the-ground judgment.
        </p>
      </div>

      <h3 style={{ margin: '0 0 16px', fontSize: 18 }}>What we prioritize</h3>
      <div className="grid grid-2" style={{ marginBottom: 32 }}>
        <RevealCard>
          <div className="pillar-card">
            <Users size={20} />
            <div>
              <h4>Women's Safety</h4>
              <p>
                Every location tracks a dedicated Women Safety Index alongside the general safety
                score, built from incident categories that disproportionately affect women
                (harassment, stalking, molestation, chain snatching) rather than folding them into a
                single undifferentiated crime number. The goal is to surface risk that generic
                "overall safety" scores tend to hide.
              </p>
            </div>
          </div>
        </RevealCard>

        <RevealCard>
          <div className="pillar-card">
            <MapPinned size={20} />
            <div>
              <h4>Tourist &amp; Visitor Safety</h4>
              <p>
                Tourist landmarks, markets, and transit hubs get particular attention because
                visitors lack the local context a resident has. Risk scores are paired with
                practical signals — footfall levels, time-of-day patterns, and proximity to help
                points — so a traveler can plan around them, not just be warned in the abstract.
              </p>
            </div>
          </div>
        </RevealCard>

        <RevealCard>
          <div className="pillar-card">
            <ShieldCheck size={20} />
            <div>
              <h4>Public Site &amp; Infrastructure Safety</h4>
              <p>
                Beyond crime alone, the model factors in environmental risk drivers — lighting
                infrastructure, crowd density, and distance to police posts — because the built
                environment shapes opportunity for crime as much as historical incident counts do.
              </p>
            </div>
          </div>
        </RevealCard>

        <RevealCard>
          <div className="pillar-card">
            <Scale size={20} />
            <div>
              <h4>Fairness &amp; Non-Stigmatization</h4>
              <p>
                Risk scores describe places and patterns, not the people who live or work there. We
                deliberately avoid framing that could stigmatize entire communities or districts, and
                we present risk as a probability to plan around, not a verdict.
              </p>
            </div>
          </div>
        </RevealCard>
      </div>

      <h3 style={{ margin: '0 0 16px', fontSize: 18 }}>How predictions are made</h3>
      <div className="prose anim-in" style={{ marginBottom: 28 }}>
        <p>
          Location-level safety scores are produced by an ensemble model (currently XGBoost,
          benchmarked against Random Forest, logistic regression, and neural network baselines —
          see the Model Performance page) trained on historical incident records, time and
          seasonality patterns, and location attributes. Scores are recalculated whenever the
          underlying dataset is refreshed through the Admin Panel's retraining pipeline, and every
          run is logged with its accuracy and the model that was ultimately selected.
        </p>
      </div>

      <RevealCard>
        <div className="disclaimer-box" style={{ marginBottom: 32 }}>
          <AlertTriangle size={16} style={{ marginBottom: 6 }} />
          <div>
            <strong>Current status:</strong> This build runs on a mock dataset for demonstration and
            integration purposes. Scores, trends, and locations shown are illustrative and must not
            be treated as verified crime statistics or used for real safety decisions until the
            platform is connected to a validated data source (e.g. Delhi Police open data or NCRB
            records) and reviewed for accuracy.
          </div>
        </div>
      </RevealCard>

      <h3 style={{ margin: '0 0 16px', fontSize: 18 }}>Data &amp; privacy principles</h3>
      <RevealCard>
        <div className="pillar-card" style={{ marginBottom: 16 }}>
          <Lock size={20} />
          <div>
            <h4>What we do and don't store</h4>
            <p>
              The system stores aggregate, location-level statistics and de-identified incident
              records — never victim-identifying information. Search history exists only to help
              users revisit locations they've already looked up and can be cleared at any time.
              Any future integration with real police data will follow the source agency's data
              sharing and redaction requirements before ingestion.
            </p>
          </div>
        </div>
      </RevealCard>
    </div>
  )
}
