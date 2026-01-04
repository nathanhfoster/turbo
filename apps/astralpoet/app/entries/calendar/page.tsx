"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Calendar from "@/components/Calendar";
import EntryList from "@/components/EntryList";
import {
  EntriesDispatchContext,
  EntriesStateContext,
  entriesSlice,
  type EntriesState,
} from "@/domains/Entries/model";
import { EntryRepository } from "@/domains/Entries/model/repository";
import type { Entry } from "@/domains/Entries/model/types";
import { connect } from "@nathanhfoster/resurrection";
import { getValidDate } from "@nathanhfoster/utils";

interface CalendarMapStateToProps {
  entries: Entry[];
}

interface CalendarMapDispatchToProps {
  addEntry: typeof entriesSlice.actions.addEntry;
}

interface CalendarConnectedProps
  extends CalendarMapStateToProps,
    CalendarMapDispatchToProps {}

const CalendarPage = ({ addEntry }: CalendarConnectedProps) => {
  const router = useRouter();

  const handleCalendarChange = useCallback(
    async (date: Date | null) => {
      if (date) {
        try {
          const date_created = getValidDate(date, true);
          const newEntry: Entry = {
            id: 0, // Will be auto-generated
            date_created,
            date_updated: date_created,
            title: `Diary entry on ${date.toLocaleDateString("en-CA")}`,
            html: "After I've installed Astral Poet today, I will make a diary entry every day from now on. In case I forget to make an entry, the app will remind me with a notification in the evening. In addition to photos, videos, audio recordings or other files, I can also add a location, tags or people to my diary entries.✍ I can use it on all my devices and synchronize the journal with the sync button on the main page. I am already looking forward to revisiting all those memories in a few months or years. ✨",
            author: 0,
            tags: "",
            people: "",
            address: "",
            latitude: "",
            longitude: "",
            date_created_by_author: date_created,
            views: 0,
            rating: 0,
            EntryFiles: [],
            is_public: false,
            size: 0,
            _size: 0,
            _shouldDelete: false,
            _shouldPost: false,
          };

          const repository = await EntryRepository.getInstance();
          const entryId = await repository.save(newEntry);
          const savedEntry = await repository.getById(entryId);

          if (savedEntry) {
            addEntry(savedEntry);
            router.push(`/entry/${String(savedEntry.id)}`);
          }
        } catch (error) {
          console.error("Failed to create entry:", error);
        }
      }
    },
    [router, addEntry],
  );

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="md:col-span-8 col-span-12">
        <Calendar onChange={handleCalendarChange} />
      </div>
      <div className="md:col-span-4 col-span-12">
        <EntryList />
      </div>
    </div>
  );
};

const ConnectedCalendarPage = connect<
  CalendarMapStateToProps,
  CalendarMapDispatchToProps,
  {}
>({
  mapDispatchToPropsOptions: [
    {
      context: EntriesDispatchContext,
      mapDispatchToProps: {
        addEntry: entriesSlice.actions.addEntry,
      },
    },
  ],
  mapStateToPropsOptions: [
    {
      context: EntriesStateContext,
      mapStateToProps: (state: EntriesState) => ({
        entries: state.entries,
      }),
    },
  ],
})(CalendarPage);

export default ConnectedCalendarPage;
