
export async function streamToString(stream) {
    const chunks = [];
    const reader = stream.getReader();
  
    while (true) {
        const { done, value } = await reader.read();
    
        if (done) break;
    
        chunks.push(value);
    }

    if (chunks.length === 0) throw Error('Your stream is empty because the chunks size is 0');
    
    const concatenatedChunks = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
  
    let offset = 0;
    for (const chunk of chunks) {
        concatenatedChunks.set(chunk, offset);
        offset += chunk.length;
    }
  
    const textDecoder = new TextDecoder();
    return textDecoder.decode(concatenatedChunks);
}

  