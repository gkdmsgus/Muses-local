import { Link, useNavigate } from 'react-router-dom';
import alarm_on from '../../assets/images/icons/alarm_on.png';
import alarm_off from '../../assets/images/icons/alarm_off.png';
import profileimg from '../../assets/images/profileimg.svg';
import museslogo from '../../assets/images/icons/logo.png';
import deletebutton from '../../assets/images/icons/deletebutton.png';
import { useEffect, useState, useRef } from 'react';
import { logoutAPI, type ApiResponse } from '../../api/auth';
import ENDPOINTS from '../../api/endpoints';
import api from '../../api/axiosInstance';
import type { Alarm } from '../../types/alarm';
import type { Member } from '../MyPage/types/apitypes/members';
import { getMyInfo } from '../../api/user';

const Header = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openAlarm, setOpenAlarm] = useState(false);
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [member, setMember] = useState<Member | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  // 로그인 상태 확인
  useEffect(() => {
    setIsLogin(!!localStorage.getItem('accessToken'));
  }, []);

  // 외부 클릭 감지(프로필 메뉴 닫기)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
        setOpenAlarm(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 알람 API
  useEffect(() => {
    if (!isLogin) return;

    const fetchAlarmList = async () => {
      try {
        const response = await api.get<ApiResponse<Alarm[]>>(
          ENDPOINTS.ALARM.LIST
        );

        if (response.data.success) {
          setAlarms(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlarmList();
  }, [isLogin]);

  // 사용자 정보 API(프로필 이미지 연동)
  useEffect(() => {
    if (!isLogin) return;
    const fetchMember = async () => {
      try {
        const response = await getMyInfo();
        setMember(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMember();
  }, [isLogin]);

  const handleLogout = async () => {
    try {
      await logoutAPI(); // 서버 로그아웃
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('role');
      setIsLogin(false);
      navigate('/', { replace: true });
    }
  };

  const handleDeleteAlarm = async (id: number) => {
    try {
      await api.delete(ENDPOINTS.ALARM.DELETE(id));

      setAlarms((prev) => prev.filter((alarm) => alarm.memberAlarmId !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-50 flex w-full px-6 py-4 border-b border-white/40 bg-white/70 backdrop-blur-[6px] items-center justify-between">
      {/* 왼쪽 영역 */}
      <div className="flex items-center gap-6">
        <Link to="/" className="text-xl font-logoFont flex items-center gap-2">
          <img src={museslogo} alt="Muses Logo" className="size-8" />
          <p>muses</p>
        </Link>

        <div className="flex h-6 items-center gap-1">
          <Link
            to="/projects"
            className="text-sm font-mediumFont text-black80 px-3 hover:text-black"
          >
            프로젝트
          </Link>

          <span className="w-px h-[12px] bg-[#D1D5DB]" />

          <Link
            to="/events"
            className="text-sm font-mediumFont text-black80 px-3 hover:text-black"
          >
            이벤트
          </Link>
        </div>
      </div>

      {/* 오른쪽 영역 */}
      {isLogin ? (
        <div className="flex items-center gap-5 relative" ref={menuRef}>
          {/* 알림 */}
          <button
            onClick={() => {
              setOpenAlarm((prev) => !prev);
              setOpenMenu(false);
            }}
            className="relative cursor-pointer"
          >
            <img
              src={(alarms.length > 0 && alarm_on) || alarm_off}
              alt="Alarm"
            />

            {alarms.length > 0 && (
              <span
                className="
              absolute -top-1 -right-1 bg-solidPink text-pastelPink text-xs rounded-full px-1"
              >
                {alarms.length}
              </span>
            )}
          </button>

          {openAlarm && (
            <div className="absolute top-14 right-13 mt-3 w-[401px] bg-white rounded-2xl shadow-xl border border-white40 p-4 z-50">
              <h3 className="text-base font-mediumFont pb-3 mb-4 border-b">
                알림 메시지
              </h3>

              <div className="max-h-[400px] overflow-y-auto space-y-3 ">
                {alarms.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-6">
                    알림이 없습니다.
                  </p>
                ) : (
                  alarms.map((alarm) => (
                    <div
                      key={alarm.memberAlarmId}
                      className="border-b border-white40 pb-4 pl-5 pr-4 flex justify-between items-start"
                    >
                      <div className="w-80">
                        <p className="text-sm font-mainFont">{alarm.content}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(alarm.alarmTime).toLocaleString()}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDeleteAlarm(alarm.memberAlarmId)}
                        className="ml-3 shrink-0 cursor-pointer"
                      >
                        <img
                          src={deletebutton}
                          alt="deleteButton"
                          className="w-3 h-3"
                        />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* 프로필 */}
          <div className="relative">
            <div className="flex justify-center items-center w-10 h-10 border border-[#D9D9D9] rounded-full">
              <img
                src={profileimg}
                alt="profile"
                className="w-7 h-7 cursor-pointer"
                onClick={() => {
                  setOpenMenu((prev) => !prev);
                  setOpenAlarm(false);
                }}
              />
            </div>

            {openMenu && (
              <div className="absolute right-0 mt-3 w-36 bg-white rounded-xl shadow-lg border border-white80 py-2">
                <button
                  onClick={() => navigate('/mypage')}
                  className="w-full text-left px-4 py-2 text-md font-mediumFont text-mainBlack hover:bg-white80"
                >
                  마이페이지
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-md font-mediumFont text-[#F87171] hover:bg-white80"
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className="flex items-center justify-center
            px-5 py-2.5 rounded-full bg-mainBlack
            text-sm font-boldFont text-white
            transition-transform hover:scale-105"
        >
          로그인/회원가입
        </button>
      )}
    </nav>
  );
};

export default Header;
