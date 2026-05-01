import { useCallback, useEffect, useState } from "react";
import { getFordModels, getOtherModels } from "../../../data/modelsStore";
import type { StoredFordModel, StoredOtherModel } from "../../../data/modelsStore";

export function useFordModels(): StoredFordModel[] {
  const read = useCallback(() => getFordModels(), []);
  const [items, setItems] = useState<StoredFordModel[]>(read);

  useEffect(() => {
    const handler = () => setItems(read());
    window.addEventListener("models-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("models-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, [read]);

  return items;
}

export function useOtherModels(): StoredOtherModel[] {
  const read = useCallback(() => getOtherModels(), []);
  const [items, setItems] = useState<StoredOtherModel[]>(read);

  useEffect(() => {
    const handler = () => setItems(read());
    window.addEventListener("other-models-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("other-models-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, [read]);

  return items;
}
