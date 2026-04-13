import type { FinanceDemoBundle } from "@/lib/finance-demo/model";
import * as barber from "./barbershop-demo-data";
import * as glox from "./glox-data";
import * as recruit from "./recruitment-demo-data";

function pack(m: FinanceDemoBundle): FinanceDemoBundle {
  return m;
}

export const saasDemoBundle = pack(glox);
export const barbershopDemoBundle = pack(barber);
export const recruitmentDemoBundle = pack(recruit);
