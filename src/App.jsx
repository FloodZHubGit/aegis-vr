"use client";

import { myPlayer } from "playroomkit";
import React from "react";
import { useGameEngine } from "./hooks/useGameEngine";
import { VR } from "./components/VR";
import { Computer } from "./components/Computer";
import { Monitor, Headset } from "lucide-react";

export default function Component() {
  const { players, isStarted, setSelectedRole } = useGameEngine();
  const me = myPlayer();

  const roles = [
    { name: "Computer", icon: Monitor },
    { name: "VR", icon: Headset },
  ];

  const isRoleSelected = (role) => {
    return players.some((player) => player.state.playerType === role);
  };

  return (
    <>
      {!isStarted && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Choisissez votre rôle
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {roles.map((role) => (
                  <button
                    key={role.name}
                    onClick={() => setSelectedRole(me, role.name)}
                    disabled={isRoleSelected(role.name)}
                    className={`flex items-center justify-center space-x-2 p-4 rounded-lg text-white font-semibold transition-all duration-200 ${
                      isRoleSelected(role.name)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                    }`}
                  >
                    <role.icon className="w-6 h-6" />
                    <span>{role.name} Player</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {isStarted && me.state.playerType === "Computer" && <Computer />}
      {isStarted && me.state.playerType === "VR" && <VR />}
    </>
  );
}
