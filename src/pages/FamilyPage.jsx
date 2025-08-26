import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import FamilySidebar from "../components/FamilySidebar";
import FamilyTodos from "../components/FamilyTodos";
import CreateFamilyModal from "../components/CreateFamilyModal";
import JoinFamilyModal from "../components/JoinFamilyModal";
import api from "../api";

export default function FamilyPage() {
  const [step, setStep] = useState("choose"); // choose | created | joined
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [family, setFamily] = useState(null);

  useEffect(() => {
    const fetchFamily = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await api.get("/family/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data && data._id) {
          setFamily(data);
          setStep("joined"); // or "created"
        }
      } catch {
        // No family found, stay on choose
      }
    };
    fetchFamily();
  }, []);
  // After create/join, set family and step
  const handleCreate = (familyData) => {
    console.log("Created family:", JSON.stringify(familyData, null, 2));
    setFamily(familyData);
    setStep("created");
    setShowCreateModal(false);
  };
  const handleJoin = (familyData) => {
    setFamily(familyData);
    setStep("joined");
    setShowJoinModal(false);
  };

  return (
    <>
      <Nav />
      <div className="family-page-container">
        {step === "choose" && (
          <div className="family-choice">
            <button
              className="family-btn"
              onClick={() => setShowCreateModal(true)}
            >
              Create Family
            </button>
            <button
              className="family-btn"
              onClick={() => setShowJoinModal(true)}
            >
              Join Family
            </button>
          </div>
        )}
        {(step === "created" || step === "joined") && family && family._id && (
          <div className="family-main-layout">
            <FamilySidebar family={family} />
            <FamilyTodos familyId={family._id} />
          </div>
        )}
        {showCreateModal && (
          <CreateFamilyModal
            onClose={() => setShowCreateModal(false)}
            onCreate={handleCreate}
          />
        )}
        {showJoinModal && (
          <JoinFamilyModal
            onClose={() => setShowJoinModal(false)}
            onJoin={handleJoin}
          />
        )}
      </div>
    </>
  );
}
