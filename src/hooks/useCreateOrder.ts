import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/api/orders";
import type { CreateOrderInput } from "@/types/api";

export function useCreateOrder() {
  return useMutation({
    mutationKey: ["orders", "create"],
    mutationFn: (input: CreateOrderInput) => createOrder(input),
  });
}
