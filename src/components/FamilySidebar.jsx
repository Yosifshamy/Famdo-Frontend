import React from "react";

export default function FamilySidebar({ family }) {
  return (
    <aside className="family-sidebar">
      <h3 className="sidebar-title">{family.name}</h3>
      <div className="sidebar-referral">
        <span>Referral Code:</span>
        <span className="referral-code">{family.referralCode}</span>
      </div>
      <div className="sidebar-members">
        <span>Members:</span>
        <ul>
          {(Array.isArray(family.members) ? family.members : []).map(
            (member, idx) => (
              <li key={idx}>{member.username || member.email || member}</li>
            )
          )}
        </ul>
      </div>
    </aside>
  );
}
