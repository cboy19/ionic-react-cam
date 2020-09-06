import React, { useState, useEffect, useCallback } from "react";
import { Plugins, FilesystemDirectory } from "@capacitor/core";

import MemoriesContext, { Memory } from "./memories-context";
import { Photo } from "../components/ImagePicker";
import { base64FromPath } from "@ionic/react-hooks/filesystem";

const { Storage, Filesystem } = Plugins;

const MemoriesContextProvider: React.FC = (props) => {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const updateMemories = memories.map((memory) => {
      return {
        id: memory.id,
        imagePath: memory.imagePath,
        title: memory.title,
        type: memory.type,
      };
    });

    Storage.set({ key: "memories", value: JSON.stringify(updateMemories) });
  }, [memories]);

  const addMemory = async(
    photo: Photo,
    title: string,
    type: "Good" | "Bad"
  ) => {

    const fileName = new Date().getTime() + ".jpeg";
    const base64String = await base64FromPath(photo.preview);
    Filesystem.writeFile({
      path: fileName,
      data: base64String,
      directory: FilesystemDirectory.Data,
    });

    const newMemory = {
      id: Math.random.toString(),
      imagePath: fileName,
      title,
      type,
      base64String: base64String,
    };

    setMemories((curMemories) => {
      return [...curMemories, newMemory];
    });
  };

  const initContext = useCallback( async () => {
    
    const memoriesData = await Storage.get({ key: 'memories' });
    const storedMemories = memoriesData.value
      ? JSON.parse(memoriesData.value)
      : [];
    const loadedMemories: Memory[] = [];
    for (const storedMemory of storedMemories) {
      const file = await Filesystem.readFile({
        path: storedMemory.imagePath,
        directory: FilesystemDirectory.Data
      });
      loadedMemories.push({
        id: storedMemory.id,
        title: storedMemory.title,
        type: storedMemory.type,
        imagePath: storedMemory.imagePath,
        base64String: 'data:image/jpeg;base64,' + file.data,
      });
    }
    setMemories(loadedMemories);
  },[]);

  return (
    <MemoriesContext.Provider
      value={{
        memories: memories,
        addMemory,
        initContext
      }}
    >
      {props.children}
    </MemoriesContext.Provider>
  );
};

export default MemoriesContextProvider;
