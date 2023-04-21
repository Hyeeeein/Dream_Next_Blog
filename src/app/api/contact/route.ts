import * as yup from "yup";
import { sendEmail } from "@/service/email";

const bodySchema = yup.object().shape({
  from: yup.string().email().required(),
  subject: yup.string().required(),
  message: yup.string().required(),
});

export async function POST(request: Request) {
  // ReadableStream : api route 에서 사용하는 request 는 노드에서 사용하는 request 와 동일하므로 json 으로 변환
  const body = await request.json();

  // request 의 body 의 내용이 유효하지 않는다면
  if (!bodySchema.isValidSync(body)) {
    return new Response(JSON.stringify({ message: "메일 전송에 실패" }), {
      status: 400,
    });
  }

  // 유효, 노드 메일러 이용, 메일 전송
  return sendEmail(body)
    .then(
      () =>
        new Response(JSON.stringify({ message: "메일을 성공적으로 보냄" }), {
          status: 200,
        })
    )
    .catch((error) => {
      console.error(error);
      return new Response(JSON.stringify({ message: "메일 전송에 실패" }), {
        status: 500,
      });
    });
}
