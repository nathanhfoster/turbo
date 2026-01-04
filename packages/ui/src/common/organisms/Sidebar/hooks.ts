"use client";

import { useState, useCallback } from "react";
import type { SidebarState } from "./types";

export const useSidebar = () => {
	const [expanded, setExpanded] = useState(true);
	const [mobile, setMobile] = useState(false);

	const toggleExpanded = useCallback(() => {
		setExpanded((prev) => !prev);
	}, []);

	const toggleMobile = useCallback(() => {
		setMobile((prev) => !prev);
	}, []);

	const setState = useCallback((state: Partial<SidebarState>) => {
		if (state.expanded !== undefined) setExpanded(state.expanded);
		if (state.mobile !== undefined) setMobile(state.mobile);
	}, []);

	return {
		expanded,
		mobile,
		toggleExpanded,
		toggleMobile,
		setState,
	};
};

