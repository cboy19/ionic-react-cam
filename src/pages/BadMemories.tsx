import React, { useContext } from "react";
import MemoriesContext from "../data/memories-context";
import MemoriesContent from "../components/MemoriesContent";

const BadMemories: React.FC = () => {
  const memoriesCtx = useContext(MemoriesContext);
  const badMemories = memoriesCtx.memories.filter(
    (memory) => memory.type === "Bad"
  );

  return <MemoriesContent items={badMemories} title="Bad Memories" />;
};

export default BadMemories;
