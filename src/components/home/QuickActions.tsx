"use client";
import React from "react";
import { QuickActionButton } from "../QuickActionButton";
import { quickActions } from "@/data/home/quickActions";

export const QuickActions = () => {
  const quickActionItems = quickActions.map((qa) => {
    if (qa.type === "external") {
      return {
        text: qa.text,
        onClick: () => (window.location.href = qa.url),
      };
    }
    if (qa.type === "route") {
      return { text: qa.text, onClick: () => (window.location.href = qa.path) };
    }
    return { text: qa.text, onClick: () => alert(qa.message) };
  });

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
