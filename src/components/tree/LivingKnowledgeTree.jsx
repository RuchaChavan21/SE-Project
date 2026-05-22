import React, { useMemo } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sprout, Sparkles, Trees } from 'lucide-react';
import TreeScene from './TreeScene';
import { useLearningOSStore } from '../../store/useLearningOSStore';

const LivingKnowledgeTree = () => {
  const navigate = useNavigate();
  const { subjects, openTopic, activeTopic, getTreeStage, tree } = useLearningOSStore();

  const nodes = useMemo(() => {
    const center = { id: 'tree-heart', type: 'default', position: { x: 420, y: 260 }, data: { label: 'EduPulse Growth Core' }, className: 'flow-core-node' };
    const topicNodes = subjects.flatMap((subject, subjectIndex) => {
      const angle = (subjectIndex / subjects.length) * Math.PI * 2;
      const subjectNode = {
        id: subject.id,
        position: { x: 420 + Math.cos(angle) * 300, y: 260 + Math.sin(angle) * 180 },
        data: { label: `${subject.name} · ${subject.mastery}%` },
        className: 'flow-branch-node',
      };
      const children = subject.topics.map((topic, topicIndex) => ({
        id: `${subject.id}-${topic.id}`,
        position: {
          x: subjectNode.position.x + Math.cos(angle + (topicIndex - 1) * 0.28) * 155,
          y: subjectNode.position.y + Math.sin(angle + (topicIndex - 1) * 0.34) * 105,
        },
        data: { label: `${topic.name} ${topic.mastery}%` },
        className: topic.weak ? 'flow-topic-node weak' : 'flow-topic-node',
      }));
      return [subjectNode, ...children];
    });
    return [center, ...topicNodes];
  }, [subjects]);

  const edges = useMemo(() => {
    const branchEdges = subjects.map((subject) => ({
      id: `tree-${subject.id}`,
      source: 'tree-heart',
      target: subject.id,
      animated: true,
      className: 'flow-energy-edge',
    }));
    const topicEdges = subjects.flatMap((subject) => subject.topics.map((topic) => ({
      id: `${subject.id}-${topic.id}-edge`,
      source: subject.id,
      target: `${subject.id}-${topic.id}`,
      animated: topic.mastery > 70,
      className: 'flow-energy-edge',
    })));
    return [...branchEdges, ...topicEdges];
  }, [subjects]);

  const handleNodeClick = (_, node) => {
    const [subjectId, ...topicParts] = node.id.split('-');
    const subject = subjects.find((item) => item.id === subjectId);
    const topicId = topicParts.join('-');
    const topic = subject?.topics.find((item) => item.id === topicId);
    if (topic) {
      openTopic(topic, subject.id);
      navigate(`/topic/${topic.id}`);
    }
  };

  return (
    <section className="ep-card ep-tree-card">
      <div className="ep-tree-header">
        <div>
          <span><Trees size={17} /> Living Knowledge Tree</span>
          <h2>{getTreeStage()}</h2>
          <p>Study time strengthens the trunk. Quizzes bloom leaves. Revision heals branches. Consistency intensifies glow.</p>
        </div>
        <div className="ep-tree-stage">
          <Sprout size={18} />
          <strong>Stage {tree.stage + 1}</strong>
          <small>{tree.glow}% glow</small>
        </div>
      </div>
      <div className="ep-tree-stage-area">
        <div className="ep-three-tree">
          <TreeScene />
        </div>
        <motion.div className="ep-tree-caption" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <Sparkles size={16} />
          Active node: {activeTopic.name}. Click any glowing fruit to enter its Topic Realm.
        </motion.div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={handleNodeClick}
          fitView
          minZoom={0.45}
          maxZoom={1.6}
          className="ep-flow"
        >
          <Background gap={28} color="rgba(125,211,252,.12)" />
          <Controls showInteractive={false} />
          <MiniMap pannable zoomable />
        </ReactFlow>
      </div>
    </section>
  );
};

export default LivingKnowledgeTree;
