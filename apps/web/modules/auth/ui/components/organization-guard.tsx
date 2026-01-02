"use client";

import { useOrganization } from "@clerk/nextjs";
import { OrgSelectionView } from "../views/org-select-view";

export const OrganizationGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { organization } = useOrganization();

  if (!organization) {
    return <OrgSelectionView />;
  }

  return <div>{children}</div>;
};
