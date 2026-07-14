import { requestJson, hasApiBaseUrl } from "./client";
import type { ApiResource, CreateOrderInput, OrderDraftResponse } from "@/types/api";

function localOrderNumber() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `WB-${date}-DRAFT`;
}

export async function createOrder(input: CreateOrderInput): Promise<OrderDraftResponse> {
  if (!hasApiBaseUrl()) {
    return {
      orderNumber: localOrderNumber(),
      status: "pending",
      paymentStatus: "unpaid",
    };
  }

  const response = await requestJson<ApiResource<OrderDraftResponse>>("/api/v1/orders", {
    method: "POST",
    body: JSON.stringify(input),
  });
  return response.data;
}
