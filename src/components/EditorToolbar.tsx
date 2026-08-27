import React from 'react';
import { useScriptStore } from '../store/scriptStore';
import { exportForLetterer } from '../utils/exportUtils';
import { PacingWarning } from './PacingWarning';

export const EditorToolbar: React.FC = () => {
  const script = useScriptStore(state => state.script);

  const handleExport = () => {
    if (script) {
      exportForLetterer(script);
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      background: '#fff',
      padding: '10px 20px',
      borderBottom: '1px solid #e0e0e0',
      zIndex: 10,
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <div className="pacing-diagnostics" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {script?.pages.map(page => 
          page.panels.map(panel => (
            <PacingWarning blocks={panel.blocks} key={panel.id} />
          ))
        )}
      </div>

      <button 
        onClick={handleExport}
        style={{
          padding: '8px 16px',
          backgroundColor: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 600,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          marginLeft: '16px'
        }}
      >
        Export Lettering Script
      </button>
    </div>
  );
};
