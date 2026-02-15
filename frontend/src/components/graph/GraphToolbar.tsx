import { memo } from "react";
import type { Core } from "cytoscape";
import { calculateAutoZoom } from "@/lib/graphStyles";

interface GraphToolbarProps {
  getCy: () => Core | null;
  nodeCount: number;
}

function GraphToolbar({ getCy, nodeCount }: GraphToolbarProps) {
  const handleAutoZoom = () => {
    const cy = getCy();
    if (!cy) return;

    cy.fit(undefined, 30);
    const zoomMultiplier = calculateAutoZoom(nodeCount);
    cy.zoom(cy.zoom() * zoomMultiplier);
    cy.center();
  };

  const handleFit = () => {
    const cy = getCy();
    if (!cy) return;
    cy.fit(undefined, 50);
  };

  const handleZoomIn = () => {
    const cy = getCy();
    if (!cy) return;
    cy.zoom(cy.zoom() * 1.3);
    cy.center();
  };

  const handleZoomOut = () => {
    const cy = getCy();
    if (!cy) return;
    cy.zoom(cy.zoom() * 0.7);
    cy.center();
  };

  return (
    <div className="absolute top-20 right-4 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg p-2 flex flex-col gap-2 z-10">
      <ToolbarButton
        icon="⚡"
        title="Auto Zoom (Smart)"
        onClick={handleAutoZoom}
        highlighted
      />
      <ToolbarButton icon="🎯" title="Fit to view" onClick={handleFit} />
      <ToolbarButton icon="➕" title="Zoom in" onClick={handleZoomIn} />
      <ToolbarButton icon="➖" title="Zoom out" onClick={handleZoomOut} />
    </div>
  );
}

interface ToolbarButtonProps {
  icon: string;
  title: string;
  onClick: () => void;
  highlighted?: boolean;
}

const ToolbarButton = memo(
  ({ icon, title, onClick, highlighted }: ToolbarButtonProps) => (
    <button
      onClick={onClick}
      title={title}
      className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors text-lg cursor-pointer ${
        highlighted ? "bg-violet-50 hover:bg-violet-100" : "hover:bg-purple-50"
      }`}
    >
      {icon}
    </button>
  ),
);

ToolbarButton.displayName = "ToolbarButton";

export default memo(GraphToolbar);
