"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import {
  Dropdown,
  IconButton,
  IconEllipsis,
} from "@nathanhfoster/ui";
import { useEntry } from "../../../../hooks";
import { initializeEntryDatabase } from "../../../../model/repository";

interface EllipsisProps {
  entryId: number;
}

export function Ellipsis({ entryId }: EllipsisProps) {
  const router = useRouter();
  const { deleteEntry } = useEntry();

  const handleDeleteEntry = async () => {
    try {
      const repository = await initializeEntryDatabase();
      await repository.delete(entryId);
      await deleteEntry(entryId);
      router.back();
    } catch (error) {
      console.error("Failed to delete entry:", error);
    }
  };

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <IconButton
          icon={<IconEllipsis />}
          variant="default"
          size="md"
          aria-label="Entry menu"
        />
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Label>Entry</Dropdown.Label>
        <Dropdown.Divider />
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Label>Danger Zone</Dropdown.Label>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleDeleteEntry}>Delete</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}

export default Ellipsis;

