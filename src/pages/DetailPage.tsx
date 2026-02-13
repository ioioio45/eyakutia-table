import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useInstitutionDetails } from "../hooks/useInstitutionsDetails";
import { getContactInfo } from "../api/institutions";
import {
  Phone,
  Mail,
  Globe,
  Clock,
  Users,
  Building,
  Info,
  Calendar,
  ChevronDown,
  ChevronUp,
  ArrowBigLeft,
} from "lucide-react";
import {
  RegimeMap,
  OrientationMap,
  OrganizationStatusMap,
  OrganizationTypeMap,
  type PreschoolGroup,
} from "../types/institution";
import { formatAgeRange, formatVacancies, formatDate } from "../utils/format";
import { useWebAppContext } from "../components/WebAppProvider";

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { details, loading, error } = useInstitutionDetails(id);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [showAllPrograms, setShowAllPrograms] = useState(false);
  const { webApp } = useWebAppContext();

  const groupsByYear =
    details?.PreschoolGroups?.reduce(
      (acc, group) => {
        const year = group.EducYear;
        if (!acc[year]) acc[year] = [];
        acc[year].push(group);
        return acc;
      },
      {} as Record<number, PreschoolGroup[]>,
    ) || {};

  const availableYears = Object.keys(groupsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  useEffect(() => {
    if (availableYears.length > 0 && selectedYear === null) {
      setSelectedYear(availableYears[0]);
    }
  }, [availableYears, selectedYear]);

  // WebApp BackButton
  useEffect(() => {
    if (webApp) {
      webApp.BackButton.show();
      webApp.BackButton.onClick(() => {
        navigate(-1); // лучше чем window.history.back()
      });

      return () => {
        webApp.BackButton.hide();
      };
    }
  }, [webApp, navigate]);

  // WebApp Expand - развернуть на весь экран
  useEffect(() => {
    if (webApp) {
      webApp.expand();
    }
  }, [webApp]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 text-center py-12 text-gray-500">
        Загрузка...
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="bg-white rounded-xl p-6 text-center py-12 text-gray-500">
        {error || "Учреждение не найдено"}
        <div className="mt-4">
          <button
            onClick={() => navigate("/")}
            className="text-cyan-600 hover:text-cyan-800 underline"
          >
            Вернуться к списку
          </button>
        </div>
      </div>
    );
  }

  const { phone, email, site, address } = getContactInfo(details);
  const name = details.ShortName || details.FullName || "Без названия";
  const status =
    OrganizationStatusMap[details.OrganizationalStatus] || "Неизвестно";
  const organizationType =
    OrganizationTypeMap[details.OrganizationType] || "Неизвестно";

  const filteredGroups = selectedYear ? groupsByYear[selectedYear] || [] : [];
  const displayedPrograms = showAllPrograms
    ? details.EducPrograms
    : details.EducPrograms?.slice(0, 5);

  const formatAcademicYear = (year: number) => `${year} - ${year + 1}`;

  return (
    <div className="bg-white rounded-xl p-4 md:p-6 mb-20">
      {/* Кнопка назад только для веба */}
      {!webApp && (
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-cyan-600 hover:text-cyan-800 mb-6"
        >
          <ArrowBigLeft className="h-5 w-5 mr-1" />
          Назад к списку
        </button>
      )}

      {/* Заголовок */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 break-words">
          {name}
        </h1>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="inline-flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs md:text-sm">
            <Building className="h-3 w-3 mr-1" />
            {organizationType}
          </span>
          <span className="inline-flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs md:text-sm">
            <Info className="h-3 w-3 mr-1" />
            {status}
          </span>
          {details.Inn && (
            <span className="inline-flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs md:text-sm">
              ИНН: {details.Inn}
            </span>
          )}
        </div>
      </div>

      {/* Сведения об организации */}
      <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-cyan-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-cyan-800 flex items-center">
            <Building className="h-5 w-5 mr-2" />
            Сведения об организации
          </h2>
        </div>
        <div className="p-6">
          <table className="w-full">
            <tbody className="divide-y divide-gray-200">
              {details.FullName && (
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-gray-600 w-1/4 align-top">
                    Полное наименование
                  </td>
                  <td className="py-3 text-sm text-gray-900 break-words">
                    {details.FullName}
                  </td>
                </tr>
              )}
              {details.Number && (
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-gray-600">
                    Номер
                  </td>
                  <td className="py-3 text-sm text-gray-900">
                    {details.Number}
                  </td>
                </tr>
              )}
              <tr>
                <td className="py-3 pr-4 text-sm font-medium text-gray-600 align-top">
                  Реализуемые образовательные программы
                </td>
                <td className="py-3 text-sm text-gray-900">
                  {details.EducPrograms && details.EducPrograms.length > 0 ? (
                    <div>
                      <ul className="list-disc list-inside space-y-1">
                        {displayedPrograms?.map((program) => (
                          <li key={program.Id} className="text-gray-700">
                            {program.Name}
                          </li>
                        ))}
                      </ul>
                      {details.EducPrograms.length > 5 && (
                        <button
                          onClick={() => setShowAllPrograms(!showAllPrograms)}
                          className="mt-2 text-cyan-600 hover:text-cyan-800 text-sm flex items-center"
                        >
                          {showAllPrograms ? (
                            <>
                              Скрыть <ChevronUp className="h-4 w-4 ml-1" />
                            </>
                          ) : (
                            <>
                              Просмотреть весь список (
                              {details.EducPrograms.length}){" "}
                              <ChevronDown className="h-4 w-4 ml-1" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
              {details.DirectorName && (
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-gray-600">
                    Руководитель
                  </td>
                  <td className="py-3 text-sm text-gray-900">
                    <div className="flex items-center">
                      {details.DirectorName}
                    </div>
                  </td>
                </tr>
              )}
              <tr>
                <td className="py-3 pr-4 text-sm font-medium text-gray-600">
                  Адрес
                </td>
                <td className="py-3 text-sm text-gray-900">
                  <div className="flex items-start">
                    <span className="break-words">
                      {address || "Не указан"}
                    </span>
                  </div>
                </td>
              </tr>
              {phone && (
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-gray-600">
                    Телефон
                  </td>
                  <td className="py-3 text-sm">
                    <a
                      href={`tel:${phone}`}
                      className="text-cyan-600 hover:text-cyan-800 underline flex items-center"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      {phone}
                    </a>
                  </td>
                </tr>
              )}
              {email && (
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-gray-600">
                    E-mail
                  </td>
                  <td className="py-3 text-sm">
                    <a
                      href={`mailto:${email}`}
                      className="text-cyan-600 hover:text-cyan-800 underline flex items-center break-all"
                    >
                      <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                      {email}
                    </a>
                  </td>
                </tr>
              )}
              {site && (
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-gray-600">
                    Сайт
                  </td>
                  <td className="py-3 text-sm">
                    <a
                      href={site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-600 hover:text-cyan-800 underline flex items-center break-all"
                    >
                      <Globe className="h-4 w-4 mr-2 flex-shrink-0" />
                      {site}
                    </a>
                  </td>
                </tr>
              )}
              {details.WorkingHours && (
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-gray-600">
                    Часы работы
                  </td>
                  <td className="py-3 text-sm text-gray-900">
                    <div className="flex items-start">
                      <Clock className="h-4 w-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                      {details.WorkingHours}
                    </div>
                  </td>
                </tr>
              )}
              {details.AdditionalInfo && details.AdditionalInfo !== "-" && (
                <tr>
                  <td className="py-3 pr-4 text-sm font-medium text-gray-600">
                    Дополнительная информация
                  </td>
                  <td className="py-3 text-sm text-gray-900">
                    {details.AdditionalInfo}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Дошкольные группы */}
      {details.PreschoolGroups && details.PreschoolGroups.length > 0 && (
        <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-cyan-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-cyan-800 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Дошкольные группы
            </h2>
          </div>
          <div className="p-4">
            {availableYears.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {availableYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      selectedYear === year
                        ? "bg-cyan-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {formatAcademicYear(year)}
                  </button>
                ))}
              </div>
            )}

            {selectedYear && (
              <div>
                <h3 className="text-md font-semibold text-gray-700 mb-3">
                  Учебный год: {formatAcademicYear(selectedYear)}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-blue-900 border border-gray-300">
                          Группа
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-blue-900 border border-gray-300">
                          Возраст
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-blue-900 border border-gray-300">
                          Режим
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-blue-900 border border-gray-300">
                          Направленность
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-blue-900 border border-gray-300">
                          Программа
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-blue-900 border border-gray-300">
                          Места
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredGroups.length > 0 ? (
                        filteredGroups.map((group) => (
                          <tr key={group.Id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900 border border-gray-200">
                              {group.Name}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
                              {formatAgeRange(group.AgeRange)}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
                              {RegimeMap[group.Regime]?.split(" ")[0] || "—"}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
                              {OrientationMap[group.Orientation]?.slice(0, 8) ||
                                "—"}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200 break-words max-w-xs">
                              {group.EducProgramName}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 border border-gray-200">
                              <span className="font-medium">
                                {group.Vacancies}/{group.CapacityMax}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={6}
                            className="px-4 py-8 text-center text-gray-500 border border-gray-200"
                          >
                            Нет групп на {formatAcademicYear(selectedYear)}{" "}
                            учебный год
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Дополнительная информация */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <Info className="h-5 w-5 mr-2 text-gray-600" />
            Дополнительная информация
          </h2>
        </div>
        <div className="p-6">
          <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {details.Inn && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <dt className="text-xs text-gray-500 mb-1">ИНН</dt>
                <dd className="text-gray-900 font-medium break-words">
                  {details.Inn}
                </dd>
              </div>
            )}
            {details.Kpp && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <dt className="text-xs text-gray-500 mb-1">КПП</dt>
                <dd className="text-gray-900 font-medium break-words">
                  {details.Kpp}
                </dd>
              </div>
            )}
            {details.Ogrn && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <dt className="text-xs text-gray-500 mb-1">ОГРН</dt>
                <dd className="text-gray-900 font-medium break-words">
                  {details.Ogrn}
                </dd>
              </div>
            )}
            {details.PuttingIntoServiceDate &&
              details.PuttingIntoServiceDate !== "0001-01-01T00:00:00" && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dt className="text-xs text-gray-500 mb-1 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Дата ввода
                  </dt>
                  <dd className="text-gray-900 font-medium">
                    {formatDate(details.PuttingIntoServiceDate)}
                  </dd>
                </div>
              )}
          </dl>
        </div>
      </div>
    </div>
  );
}
