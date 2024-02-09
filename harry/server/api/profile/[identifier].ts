import { IProfileResponse } from "~/interfaces/ProfileResponse";
import { apiFetcher } from "@/server/utils/llApiFetcher";
export default defineEventHandler(async (event) => {
  const { node } = event;
  const identifier = getRouterParam(event, 'identifier') as string;
  const fieldService = 
    (/^[a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}$/i.test(identifier)) ? 
      'code' 
    : 
      'uname';
  const response = await apiFetcher.get<IProfileResponse>(`profile/${fieldService}/${identifier}`);
  if (response.code !== null) {
    node.res.statusCode = response.code!;
  }
  /*response.data = {
    profile: {
      id: 'UNONEGRO',
      obituary: "Tyrone Gonzalez, conocido como Cancerbero, fue un destacado rapero venezolano.",
      first_name: "Tyrone",
      last_name: "Gonzalez",
      uname: "cancerbero",
      born_place: "Maracay, Venezuela",
      born_date: "22 de mayo de 1988",
      death_date: "28 de enero de 2014",
      bio: "Cancerbero fue reconocido por su talento en el rap y sus letras profundas que abordaban temas sociales y personales.",
      nickname: "Cancerbero",
      images: [
        "https://pm1.aminoapps.com/6623/cf89309039ee9fea200341c86c134430213bbc13_128.jpg",
        "https://i.pinimg.com/564x/c5/1a/4e/c51a4ea78b7d1aa877c829cc6089546e.jpg"
      ],
      videos: [
        "https://www.youtube.com/embed/8cKvvmPwgP4",
        "https://www.youtube.com/embed/sq6oc066w14"
      ]
    }
  } as IProfileResponse;*/
  
  node.res.end(JSON.stringify(response));
})