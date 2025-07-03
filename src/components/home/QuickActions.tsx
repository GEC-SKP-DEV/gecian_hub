"use client";
import React from "react";
import { QuickActionButton } from "../QuickActionButton";

export const QuickActions = () => {
  const quickActionItems = [
    {
      text: "College Login",
      onClick: () =>
        window.open(
          "https://gecskp.etlab.in/user/login",
          "_blank",
          "noopener,noreferrer",
        ),
    },
    {
      text: "Bus Time",
      onClick: () => (window.location.href = "/bus"),
    },
    {
      text: "Lost & Found",
      onClick: () => (window.location.href = "/lost"),
    },
    {
      text: "SGPA Calculator",
      onClick: () =>
        window.open("https://ktugpa.web.app/", "_blank", "noopener,noreferrer"),
    },
    {
      text: "Hackathon",
      onClick: () =>
        window.open(
          "https://devpost.com/hackathons",
          "_blank",
          "noopener,noreferrer",
        ),
    },
    {
      text: "College Map",
      onClick: () => (window.location.href = "/floor"),

    },
    {
      text: "Project Collobaration",
      onClick: () => alert("Project Collobaration feature coming soon!"),
    },
    {
      text: "Club",
      onClick: () => (window.location.href = "/club"),
    },
    {
      text: "Anonymous Complaint",
      onClick: () => alert("Anonymous Complaint feature coming soon!"),
    },
    {
      text: "Private Hostel",
      onClick: () => alert("Private Hostel information coming soon!"),
    },
    {
      text: "Repeto",
      onClick: () =>
        window.open(
          "https://codecompasss.github.io/repeto/",
          "_blank",
          "noopener,noreferrer",
        ),
    },
    {
      text: "Project Showcase",
      onClick: () =>
        window.open(
          "https://codecompasss.github.io/project_archive/",
          "_blank",
          "noopener,noreferrer",
        ),
    },
  ];

  return (
    <div
      data-testid="quick-actions"
      className="pt-6 w-full space-y-4 md:mt-0 md:flex md:h-full md:flex-col md:justify-center lg:pt-0 xl:pt-0"
    >
      <div className="md:flex md:flex-1 md:flex-col md:justify-center">
        {/* Alternating 2 and 3 Column Layout */}
        <div className="space-y-4 md:flex md:flex-1 md:flex-col md:justify-center lg:space-y-6 xl:space-y-8">
          {/* First row - 2 columns */}
          <div className="grid grid-cols-2 gap-3 lg:gap-4 xl:gap-5">
            {quickActionItems.slice(0, 2).map((item, index) => (
              <QuickActionButton
                key={index}
                text={item.text}
                onClick={item.onClick}
              />
            ))}
          </div>

          {/* Second row - 3 columns */}
          <div className="grid grid-cols-3 gap-3 lg:gap-4 xl:gap-5">
            {quickActionItems.slice(2, 5).map((item, index) => (
              <QuickActionButton
                key={index + 2}
                text={item.text}
                onClick={item.onClick}
              />
            ))}
          </div>

          {/* Third row - 2 columns */}
          <div className="grid grid-cols-2 gap-3 lg:gap-4 xl:gap-5">
            {quickActionItems.slice(5, 7).map((item, index) => (
              <QuickActionButton
                key={index + 5}
                text={item.text}
                onClick={item.onClick}
              />
            ))}
          </div>

          {/* Fourth row - 3 columns */}
          <div className="grid grid-cols-3 gap-3 lg:gap-4 xl:gap-5">
            {quickActionItems.slice(7, 10).map((item, index) => (
              <QuickActionButton
                key={index + 7}
                text={item.text}
                onClick={item.onClick}
              />
            ))}
          </div>

          {/* Fifth row - 2 columns */}
          <div className="grid grid-cols-2 gap-3 lg:gap-4 xl:gap-5">
            {quickActionItems.slice(10, 12).map((item, index) => (
              <QuickActionButton
                key={index + 10}
                text={item.text}
                onClick={item.onClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
