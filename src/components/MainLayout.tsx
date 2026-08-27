import React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { ScriptEditor } from './ScriptEditor';
import { ReferenceDrawer } from './ReferenceDrawer';

export const MainLayout: React.FC = () => {
  return (
    <PanelGroup direction="horizontal" style={{ height: '100vh', width: '100vw' }}>
      <Panel defaultSize={70}>
        <ScriptEditor />
      </Panel>
      <PanelResizeHandle style={{ width: '4px', backgroundColor: '#e0e0e0', cursor: 'col-resize' }} />
      <Panel defaultSize={30}>
        <ReferenceDrawer />
      </Panel>
    </PanelGroup>
  );
};
