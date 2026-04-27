"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVisualEditing } from "./visual-editing/VisualEditingProvider";
import { EditableText } from "./visual-editing/EditableText";
import { AddRemoveControls } from "./visual-editing/AddRemoveControls";

interface CenteredPricingProps {
  data?: {
    plansLabel?: string;
    plansTitle?: string;
    plans?: any[];
  };
  documentId?: string;
}

export const CenteredPricing = ({ data, documentId }: CenteredPricingProps) => {
  const { getLiveItems, getLiveValue } = useVisualEditing();
  const label = getLiveValue(documentId || "", "plansLabel", data?.plansLabel || "Investment");
  const title = getLiveValue(documentId || "", "plansTitle", data?.plansTitle || "Plans built for scale.");
  const originalPlans = data?.plans || [];
  const plans = getLiveItems(documentId || "", "plans", originalPlans);

  const isSinglePlan = plans.length === 1;
  const isTwoPlans = plans.length === 2;

  return (
    <section className="relative -mt-[1px] py-24 px-6 bg-[#051A0E] overflow-hidden border-none z-10">
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#051A0E] via-[#051A0E] to-transparent pointer-events-none z-20" />
      <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] bg-white/[0.03] blur-[160px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-30 text-center mb-16">
        <div className="flex justify-between items-center w-full max-w-xs mx-auto mb-4">
          <div className="text-emerald-500 text-[10px] font-bold tracking-[0.4em] uppercase mx-auto">
            {documentId ? (
              <EditableText id={documentId} field="plansLabel" value={label} as="span" />
            ) : label}
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-5 whitespace-pre-wrap">
          {documentId ? (
            <EditableText id={documentId} field="plansTitle" value={title} as="span" />
          ) : title}
        </h2>
        {documentId && (
          <div className="mt-8">
            <AddRemoveControls 
              id={documentId} 
              field="plans" 
              label="Plan" 
              fields={[
                { name: "name", label: "Plan Name", type: "string", placeholder: "e.g. Creator Plus" },
                { name: "description", label: "Description / Price", type: "string", placeholder: "e.g. $1,500/mo" },
                { name: "features", label: "Features", type: "array", placeholder: "Add a feature" },
                { name: "popular", label: "Most Popular", type: "boolean", placeholder: "Highlight this plan" }
              ]}
            />
          </div>
        )}
      </div>

      <div className={`${isSinglePlan ? 'max-w-md' : isTwoPlans ? 'max-w-4xl' : 'max-w-7xl'} mx-auto relative z-30`}>
        <div className={`grid gap-8 items-stretch ${isSinglePlan ? 'grid-cols-1' : isTwoPlans ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
          {plans.map((plan: any, i: number) => (
            <div
              key={plan._key || i}
              className={`flex flex-col p-8 md:p-10 rounded-[2.5rem] border backdrop-blur-3xl transition-all duration-700 w-full group relative
                ${plan.popular ? "border-emerald-500/40 bg-white/5 shadow-[0_0_80px_rgba(16,185,129,0.12)] scale-105 z-20" : "border-white/10 bg-white/5 opacity-80 scale-100"}
              `}
            >
              {documentId && (
                <div className="absolute top-4 right-4 z-40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <AddRemoveControls 
                    id={documentId} 
                    field="plans" 
                    itemKey={plan._key} 
                    label="Plan"
                    initialData={plan}
                    fields={[
                      { name: "name", label: "Plan Name", type: "string", placeholder: "e.g. Creator Plus" },
                      { name: "description", label: "Description / Price", type: "string", placeholder: "e.g. $1,500/mo" },
                      { name: "features", label: "Features", type: "array", placeholder: "Add a feature" },
                      { name: "popular", label: "Most Popular", type: "boolean", placeholder: "Highlight this plan" }
                    ]}
                  />
                </div>
              )}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-emerald-500 text-black text-[9px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                  Most Popular
                </div>
              )}
              <div className={`${plan.popular ? 'text-emerald-400' : 'text-white/40'} text-[10px] font-bold tracking-widest mb-2 whitespace-pre-wrap`}>
                {documentId ? (
                  <EditableText id={documentId} field={`plans[_key == "${plan._key}"].description`} value={plan.description} as="span" />
                ) : plan.description}
              </div>
              <span className="text-white text-4xl font-bold tracking-tighter mb-8 block whitespace-pre-wrap">
                {documentId ? (
                  <EditableText id={documentId} field={`plans[_key == "${plan._key}"].name`} value={plan.name} as="span" />
                ) : plan.name}
              </span>
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features?.map((f: string, idx: number) => (
                  <li key={idx} className={`flex items-center gap-2.5 text-sm ${plan.popular ? 'text-white' : 'text-white/60'}`}>
                    <Check className={`w-3.5 h-3.5 ${plan.popular ? 'text-emerald-500' : 'text-emerald-800'}`} />
                    {documentId ? (
                      <EditableText id={documentId} field={`plans[_key == "${plan._key}"].features[${idx}]`} value={f} as="span" />
                    ) : f}
                  </li>
                ))}
              </ul>
              <Link href="#schedule" className="block mt-auto">
                <Button className={`w-full h-12 rounded-full font-black uppercase tracking-widest text-[9px] transition-all
                  ${plan.popular ? 'bg-white text-black hover:bg-emerald-500 hover:text-white' : 'bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black'}
                `}>
                  I Need This
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#051A0E] via-[#051A0E]/80 to-transparent pointer-events-none z-20" />
    </section>
  );
};
