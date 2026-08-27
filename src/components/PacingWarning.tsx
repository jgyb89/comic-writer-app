import React from 'react';
import { Block } from '../types/comic';
import { calculatePanelDialogueWords } from '../utils/pacingUtils';

interface PacingWarningProps {
  blocks: Block[];
}

export const PacingWarning: React.FC<PacingWarningProps> = ({ blocks }) => {
  const wordCount = calculatePanelDialogueWords(blocks);
  const threshold = 35; // standard comic industry threshold per panel

  if (wordCount <= threshold) {
    return null;
  }

  return (
    <div className="pacing-warning">
      <span className="pacing-warning-badge">
        Text Heavy: {wordCount} words
      </span>
      <style>{`
        .pacing-warning {
          display: inline-flex;
          align-items: center;
          margin-top: 4px;
        }
        .pacing-warning-badge {
          background-color: #ffebee;
          color: #c62828;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 12px;
          border: 1px solid #ffcdd2;
          animation: pulse 2s infinite ease-in-out;
        }
        @keyframes pulse {
          0% { opacity: 0.8; transform: scale(0.98); }
          50% { opacity: 1; transform: scale(1); }
          100% { opacity: 0.8; transform: scale(0.98); }
        }
      `}</style>
    </div>
  );
};
