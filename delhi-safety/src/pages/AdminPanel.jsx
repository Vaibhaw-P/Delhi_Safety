import { useRef, useState } from 'react'
import { Database, Upload, FileText, RefreshCw, Brain } from 'lucide-react'
import { datasetStats, retrainingHistory } from '../data/mockData.js'
import { uploadDataset, triggerRetrainingPipeline, isSupabaseConfigured } from '../lib/supabaseClient.js'

export default function AdminPanel() {
  const fileInput = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [uploadMsg, setUploadMsg] = useState(null)
  const [retraining, setRetraining] = useState(false)
  const [retrainMsg, setRetrainMsg] = useState(null)

  async function handleFile(file) {
    if (!file) return
    setUploading(true)
    setUploadMsg(null)
    try {
      const res = await uploadDataset(file)
      setUploadMsg(res.mock
        ? `"${file.name}" queued (demo mode — connect Supabase to persist uploads).`
        : `"${file.name}" uploaded successfully.`)
    } catch (err) {
      setUploadMsg(`Upload failed: ${err.message}`)
    } finally {
      setUploading(false)
    }
  }

  async function handleRetrain() {
    setRetraining(true)
    setRetrainMsg(null)
    try {
      const res = await triggerRetrainingPipeline()
      setRetrainMsg(res.mock
        ? 'Retraining pipeline triggered (demo mode — connect a Supabase Edge Function to run a real job).'
        : 'Retraining pipeline started.')
    } catch (err) {
      setRetrainMsg(`Failed to start pipeline: ${err.message}`)
    } finally {
      setRetraining(false)
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">System Administration</h1>
          <p className="page-subtitle">Manage datasets, data ingestion, and AI model retraining</p>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1fr 360px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="panel anim-in">
            <h3 className="panel-title"><Database size={16} /> Dataset Statistics</h3>
            <div className="grid grid-2" style={{ marginBottom: 16 }}>
              <div className="metric-pill">
                <span className="m-label">Total Records</span>
                <span className="m-value">{datasetStats.totalRecords.toLocaleString()}</span>
              </div>
              <div className="metric-pill">
                <span className="m-label">Date Range</span>
                <span className="m-value" style={{ fontSize: 15 }}>{datasetStats.dateRange}</span>
              </div>
            </div>
            <div style={{ fontSize: 12.5, color: '#8b95a7' }}>
              <strong style={{ color: '#eef1f6' }}>Sources:</strong> {datasetStats.sources.join(', ')}
              <br />
              <strong style={{ color: '#eef1f6' }}>Last upload:</strong> {datasetStats.lastUpload}
              {!isSupabaseConfigured && (
                <div style={{ marginTop: 10, color: '#f5a623' }}>
                  Running in mock-data mode — connect Supabase to see live figures.
                </div>
              )}
            </div>
          </div>

          <div className="panel anim-in d1">
            <h3 className="panel-title"><RefreshCw size={16} /> Retraining History</h3>
            <table className="data-table">
              <thead>
                <tr><th>Date</th><th>Status</th><th>Best Model</th><th>Accuracy</th><th>Duration</th></tr>
              </thead>
              <tbody>
                {retrainingHistory.map((r) => (
                  <tr key={r.id}>
                    <td>{r.date}</td>
                    <td><span className={`status-pill status-${r.status}`}>{r.status}</span></td>
                    <td>{r.bestModel}</td>
                    <td>{r.accuracy ? `${r.accuracy}%` : '—'}</td>
                    <td>{r.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="panel anim-in d1">
            <h3 className="panel-title"><Upload size={16} /> Upload Dataset</h3>
            <p style={{ fontSize: 12.5, color: '#8b95a7', marginTop: -6, marginBottom: 14 }}>
              Upload Delhi Police crime reports in CSV format to expand the training corpus.
            </p>
            <div className="dropzone" onClick={() => fileInput.current?.click()}>
              <FileText size={22} style={{ marginBottom: 8 }} />
              <div><strong>Click to upload</strong> or drag and drop</div>
              <div style={{ marginTop: 4, color: '#5b6577' }}>CSV files only</div>
            </div>
            <input
              ref={fileInput}
              type="file"
              accept=".csv"
              hidden
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            {uploading && <p className="msg-enter" style={{ fontSize: 12.5, color: '#3b9eff', marginTop: 10 }}>Uploading…</p>}
            {uploadMsg && <p className="msg-enter" style={{ fontSize: 12.5, color: '#8b95a7', marginTop: 10 }}>{uploadMsg}</p>}
          </div>

          <div className="panel anim-in d2">
            <h3 className="panel-title"><Brain size={16} /> Retrain AI Model</h3>
            <p style={{ fontSize: 12.5, color: '#8b95a7', marginTop: -6, marginBottom: 16, lineHeight: 1.6 }}>
              Trigger a pipeline to retrain the risk prediction models using the latest dataset.
              This process evaluates multiple algorithms and selects the best performer.
            </p>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleRetrain} disabled={retraining}>
              <RefreshCw size={16} className={retraining ? 'spin-icon' : ''} /> {retraining ? 'Starting…' : 'Start Retraining Pipeline'}
            </button>
            {retrainMsg && <p className="msg-enter" style={{ fontSize: 12.5, color: '#8b95a7', marginTop: 10 }}>{retrainMsg}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
