import { Button, InputField } from "../components";
import Icon from "../components/common/Icon";
import IconButton from "../components/common/IconButton";

const UserInfo = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <div className="w-[643px] flex flex-col items-center gap-y-12 ">
        <h1 className="text-headlineL self-start">내 정보</h1>
        <div className="relative">
          <Icon
            name="user"
            size={160}
            containerStyle="border rounded-full w-[160px] h-[160px] border-3 overflow-hidden"
          />
          <IconButton
            iconProps={{ name: "imageEdit", size: 40 }}
            buttonStyle="absolute -right-2 bottom-2 px-2 py-2 bg-white border rounded-full border-none"
          />
        </div>
        <div className="w-full flex flex-col gap-y-8">
          <div className="relative">
            <InputField
              type="text"
              placeholder="사용할 닉네임을 입력하세요"
              iconProps={{ name: "user", size: 24 }}
            />
            <span className="absolute top-full left-4 text-caption text-red flex justify-start mt-1">
              중복되는 닉네임입니다
            </span>
          </div>

          <InputField
            type="text"
            placeholder="0000000@gmail.com"
            iconProps={{ name: "email", size: 24 }}
            disabled={true}
          />
          <Button type="submit" label="비밀번호 수정" buttonStyle=" h-18" />
        </div>
        <div className="flex w-full justify-end gap-x-4">
          <Button
            type="submit"
            label="탈퇴"
            buttonStyle="bg-red w-[158px] h-[72px]"
          />
          <Button
            type="submit"
            label="저장"
            buttonStyle="bg-main w-[158px] h-[72px]"
          />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
