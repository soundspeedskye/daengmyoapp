import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getList } from "../../api/animalApi";
import useCustomMove from "../../hooks/useCustomMove";
import { API_SERVER_HOST } from "../../api/rootApi";
import PageComponent from "../common/PageComponent";
import useCustomLogin from "../../hooks/useCustomLogin";

const host = API_SERVER_HOST;

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const AnimalListComponent = () => {
  const { exceptionHandle,isAdmin } = useCustomLogin(); // 에러 핸들러는 훅에서 받아옵니다.
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const navigate = useNavigate();

  const [serverData, setServerData] = useState(initState);

  const handleClickAdd = useCallback(() => {
    navigate("../add");
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getList({ page, size });
        setServerData(data);
      } catch (err) {
        exceptionHandle(err); // 여기서 에러를 처리합니다.
        alert("데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.");
      }
    };

    fetchData();
  }, [page, size, refresh]); // 의존성 배열에서 exceptionHandle 제거

  return (
    <div className="border-2 border-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-1">
        {serverData.dtoList.map((animal) => (
          <div
            key={animal.ano}
            className="border rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out cursor-pointer"
            onClick={() => moveToRead(animal.ano)}
            aria-label={`${animal.aname} 상세 정보 보기`}
          >
            <img
              alt={`${animal.aname}`}
              className="w-full h-64 object-cover transform transition duration-300 ease-in-out hover:scale-110"
              src={`${host}/api/animal/view/s_${animal.uploadFileNames[0]}`}
            />
            <div className="bottom-0 bg-white text-lg p-4">
              <div className="text-center p-1">{animal.aname}</div>
              <div className="text-center p-1 font-extrabold">
                {animal.age.toLocaleString("ko-KR")}살
              </div>
            </div>
          </div>
        ))}
      </div>
      <PageComponent
        serverData={serverData}
        movePage={moveToList}
      ></PageComponent>
      {isAdmin && (
      <div
        className="block w-1/3 py-2 bg-red-900 text-white text-center mt-4 hover:bg-red-700 transition duration-200 ease-in-out mx-auto cursor-pointer"
        onClick={handleClickAdd}
        aria-label="새 동물 추가"
      >
        동물 추가
      </div>
      )}
    </div>
  );
};

export default AnimalListComponent;
