
"use client";
import BuySellAbi from '@/lib/abi/buy-sell-dummy.json'

import { useState, useCallback } from "react";
import { BrowserProvider, Contract } from "ethers";
import { useWalletClient } from 'wagmi';

export function useLandBlock() {
  const [loading, setLoading] = useState(false);
  const { data: walletClient } = useWalletClient()

  const getContract = useCallback(async  () => {
    if (!window.ethereum) {
      throw new Error("Wallet not found");
    }

    const provider = new BrowserProvider(walletClient as any);
    const signer = await provider.getSigner();

    return new Contract(
      BuySellAbi.contractAddress,
      BuySellAbi.abi,
      signer
    );
  },[walletClient]);

  const buy = useCallback(async (itemId: number) => {
    try {
      setLoading(true);
      const contract = await getContract();
      const tx = await contract.buy(itemId);
      await tx.wait();
      return tx.hash;
    } catch (err: any) {
      console.log(err)
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getContract]);

  const sell = useCallback(async (itemId: number) => {
    try {
      setLoading(true);
      const contract = await getContract();
      const tx = await contract.sell(itemId);
      await tx.wait();
      return tx.hash;
    } catch (err: any) {
      console.log(err)
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getContract]);

  const buyMultiple = useCallback(async (itemIds: number[]) => {
    try {
      setLoading(true);
      const contract = await getContract();
      const tx = await contract.buyMultiple(itemIds);
      await tx.wait();
      return tx.hash;
    } catch (err: any) {
      console.log(err)
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getContract]);

  const sellMultiple = useCallback(async (itemIds: number[]) => {
    try {
      setLoading(true);
      const contract = await getContract();
      const tx = await contract.buyMultiple(itemIds);
      await tx.wait();
      return tx.hash;
    } catch (err: any) {
      console.log(err)
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getContract]);

  return { buy, sell, buyMultiple, sellMultiple, loading }
}
