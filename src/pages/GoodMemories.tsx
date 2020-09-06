import React, { useContext } from "react";

import MemoriesContext from "../data/memories-context";
import MemoriesContent from '../components/MemoriesContent';

const GoodMemories = () => {
  const memoriesCtx = useContext(MemoriesContext);
  const goodMemories = memoriesCtx.memories.filter(
    (memory) => memory.type === "Good"
  );

  return (
      <MemoriesContent items={goodMemories} title='Good Memories' />
  );
};

export default GoodMemories;
