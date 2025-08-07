import React from "react";
import { Body, Chip, COLORS } from "@daycan/ui";
import {
  searchResultList,
  searchResultItem,
  profileImage,
  profileImageImg,
  defaultAvatar,
  userInfo,
  roleTag,
} from "./SearchStaffResultList.css";
import type { SearchResultItem } from "./types";

interface SearchStaffResultListProps {
  results: SearchResultItem[];
  onSelect?: (item: SearchResultItem) => void;
  selectedStaffId?: string;
}

export const SearchStaffResultList: React.FC<SearchStaffResultListProps> = ({
  results,
  onSelect,
  selectedStaffId,
}) => {
  const handleItemClick = (item: SearchResultItem) => {
    onSelect?.(item);
  };

  return (
    <div className={searchResultList}>
      {results.map((item) => (
        <div
          key={item.id}
          className={searchResultItem}
          data-selected={item.id === selectedStaffId}
          onClick={() => handleItemClick(item)}
        >
          <div className={profileImage}>
            {item.profileImage ? (
              <img
                src={item.profileImage}
                alt={item.name}
                className={profileImageImg}
              />
            ) : (
              <div className={defaultAvatar}>
                <Body type="small" weight={600} color={COLORS.gray[400]}>
                  {item.name.charAt(0)}
                </Body>
              </div>
            )}
          </div>
          <div className={userInfo}>
            <Body type="medium" weight={500} color={COLORS.gray[800]}>
              {item.name}
            </Body>
          </div>
          <div className={roleTag}>
            <Chip style={{ backgroundColor: COLORS.green[200] }} round="s">
              <Body type="xsmall" weight={500} color={COLORS.green[500]}>
                {item.role}
              </Body>
            </Chip>
          </div>
        </div>
      ))}
    </div>
  );
};
