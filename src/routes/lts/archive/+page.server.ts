import type { PageServerLoad } from './$types';
import { LtInfoFacade } from '$lib/LtInfoFacade';


export const load: PageServerLoad = async (event) => {
  const LtInfoService = new LtInfoFacade;
  const latestLtData50 = await LtInfoService.LtHoldRequest.getLatestLtInfo();
  const latestLtData = await Promise.all(latestLtData50.map(async(LtData) => {
    const SpeakerData = await LtInfoService.LtSpeakerRequest.getLtSpeakerInfoFromLtID(LtData.id);
    const jpDate = LtData.holdDate.toLocaleDateString("ja-jp", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "narrow",
      hour: "2-digit",
      minute: "2-digit",
  });
    return {
      id: LtData.id,
      name: LtData.name,
      maxMem: LtData.maxMem,
      assignMem: SpeakerData.length,
      holdDate: jpDate
    }
  }));
  return {
    latestLt: latestLtData,
  }
}