import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import './App.css';

// Formに入力したデータ保存用のInterface
interface InputData {
  username: string;
  affiliation_year: string;
  mail_address: string;
  phone_number: string;
  message: string;
}

function App() {
  // 月リスト
  const monthList: number[] = [];
  for (let i = 1; i <= 12; i++) {
    monthList.push(i);
  }

  // 日リスト
  const dateList: number[] = [];
  for (let i = 1; i <= 31; i++) {
    dateList.push(i);
  }

  //所属代リスト
  const AffiliationYearList: string[] = [];
  for (let i = 94; i <= 125; i++) {
    if (i < 100) {
      AffiliationYearList.push(i.toString().padStart(2, '0'));
    } else {
      const year = (i - 100).toString().padStart(2, '0');
      AffiliationYearList.push(year);
    }
  }

  // 月の日にち最大値リスト
  let datesOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // useForm関数の設定
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<InputData>({ mode: 'onChange' }); //defaultValues: { : } 

  // Submitイベント
  /* 
  const onSubmit = (data: InputData) => {
    alert(`Name: ${data.username}\n affiliation_year: ${data.affiliation_year}\n MailAddress: ${data.mail_address}\n PhoneNumber: ${data.phone_number}\n Message: ${data.message}\n`);
  }
  */
  const submitData = async (data: InputData) => {
    try {
      // バックエンドのURLを正しいものに変更
      const response = await axios.post('http://127.0.0.1:8080/submit', data);
      console.log('データが正常に送信されました', response.data);
      // 成功メッセージをユーザーに表示
      alert('フォームが正常に送信されました');
    } catch (error) {
      console.error('エラーが発生しました', error);
      // エラーメッセージをユーザーに表示
      alert('送信中にエラーが発生しました。もう一度お試しください。');
    }
  };

  return (
    <form onSubmit={handleSubmit(submitData)}>
      <h2>予約フォーム</h2>

      <h4>説明欄</h4>

      <div>

      </div>

      <div>
        <div>名前</div>
        <div>
          <input type="text"
            {...register("username", {
              required: "名前を入力してください",
            })} />
        </div>
        <ErrorMessage
          errors={errors}
          name="username"
          render={({ message }: { message: string }) => <div>{message}</div>}
        />
      </div>

      <div>
        <div>代</div>
        <div>
          <select
            {...register("affiliation_year")}>
            {AffiliationYearList.map((item) => {
              return (
                <option key={item} value={item}>
                  '{item}
                </option>
              );
            })}
          </select>
        </div>
        <ErrorMessage
          errors={errors}
          name="affiliation_year"
          render={({ message }: { message: string }) => <div>{message}</div>}
        />
      </div>

      // validationの課題あり（@がないとダメなど）
      <div>
        <div>メールアドレス</div>
        <div>
          <input type="text"
            {...register("mail_address", {
              required: "メールアドレスを入力してください",
            })} />
        </div>
        <ErrorMessage
          errors={errors}
          name="mail_address"
          render={({ message }: { message: string }) => <div>{message}</div>}
        />
      </div>

      <div>
        <div>電話番号</div>
        <div>
          <input type="text"
            {...register("phone_number", {
              required: "電話番号を入力してください",
            })} />
        </div>
        <ErrorMessage
          errors={errors}
          name="phone_number"
          render={({ message }: { message: string }) => <div>{message}</div>}
        />
      </div>

      <div>
        <div>その他（100文字以内）</div>
        <div>
          <textarea
            {...register("message", {
              maxLength: { value: 100, message: "100文字以内で入力してください" }
            })}
          ></textarea>
        </div>
        <ErrorMessage
          errors={errors}
          name="message"
          render={({ message }: { message: string }) => <div>{message}</div>}
        />
      </div>

      <button type="submit">送信</button>
    </form>
  );
}

export default App;