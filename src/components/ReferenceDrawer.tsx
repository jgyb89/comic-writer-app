import React, { useState } from 'react';
import { loreData } from '../data/loreData';

export const ReferenceDrawer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Characters' | 'Locations' | 'Outline'>('Characters');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#f8fafc', borderLeft: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid #ddd' }}>
        <button 
          style={{ flex: 1, padding: '8px', border: 'none', background: activeTab === 'Characters' ? '#f0f0f0' : 'transparent', cursor: 'pointer' }}
          onClick={() => setActiveTab('Characters')}
        >
          Characters
        </button>
        <button 
          style={{ flex: 1, padding: '8px', border: 'none', background: activeTab === 'Locations' ? '#f0f0f0' : 'transparent', cursor: 'pointer' }}
          onClick={() => setActiveTab('Locations')}
        >
          Locations
        </button>
        <button 
          style={{ flex: 1, padding: '8px', border: 'none', background: activeTab === 'Outline' ? '#f0f0f0' : 'transparent', cursor: 'pointer' }}
          onClick={() => setActiveTab('Outline')}
        >
          Outline
        </button>
      </div>
      <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        {activeTab === 'Characters' && (
          <div>
            {loreData.characters.map((char, index) => (
              <div key={index} style={{ marginBottom: '12px' }}>
                <strong>{char.name}</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem' }}>{char.bio}</p>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'Locations' && (
          <div>
            {loreData.locations.map((loc, index) => (
              <div key={index} style={{ marginBottom: '12px' }}>
                <strong>{loc.name}</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem' }}>{loc.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Outline' && (
          <div>
            <h4 style={{ marginTop: 0 }}>Story Outline</h4>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>{loreData.outline}</p>
          </div>
        )}
      </div>
    </div>
  );
};

