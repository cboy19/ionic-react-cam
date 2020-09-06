import React from 'react';
import { Photo } from '../components/ImagePicker';

type MemoryType = 'Good' | 'Bad';

export interface Memory {
    id: string;
    imagePath: string;
    title: string;
    type: MemoryType;
    base64String: string;
};

const MemoriesContext = React.createContext<{
    memories: Memory[],
    addMemory: (photo: Photo, title: string, type: MemoryType) => void;
    initContext: () => void
}>({
    memories: [],
    addMemory: () => {},
    initContext: () => {}
});

export default MemoriesContext;