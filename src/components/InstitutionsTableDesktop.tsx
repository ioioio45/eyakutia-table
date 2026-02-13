import { useNavigate } from "react-router-dom";
import { type Institution } from "../types/institution";
import { getContactInfo } from "../api/institutions";

interface InstitutionsTableDesktopProps {
  institutions: Institution[];
  loading: boolean;
  searchQuery: string;
}

export default function InstitutionsTableDesktop({
  institutions,
  loading,
  searchQuery,
}: InstitutionsTableDesktopProps) {
  const navigate = useNavigate();

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Загрузка...</div>;
  }

  if (institutions.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        {searchQuery ? "Ничего не найдено" : "Нет данных"}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200 overflow-hidden">
        <thead className="bg-gray-200 text-cyan-600">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-strong">№</th>
            <th className="px-4 py-3 text-left text-sm font-strong">
              Наименование
            </th>
            <th className="px-4 py-3 text-left text-sm font-strong">Адрес</th>
            <th className="px-4 py-3 text-left text-sm font-strong">Телефон</th>
            <th className="px-4 py-3 text-left text-sm font-strong">Сайт</th>
            <th className="px-4 py-3 text-left text-sm font-strong">E-mail</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {institutions.map((inst, index) => {
            const name = inst.ShortName || inst.FullName || "Без названия";
            const { phone, email, site, address } = getContactInfo(inst);

            return (
              <tr
                key={inst.Id}
                onClick={() => navigate(`/view/${inst.Id}`)}
                className="animate-repeat hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-sm">
                  <a className="text-cyan-600 hover:text-cyan-800 hover:underline font-medium underline">
                    {name}
                  </a>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {address || "—"}
                </td>
                <td className="px-4 py-3 text-sm">
                  {phone ? (
                    <a
                      href={`tel:${phone}`}
                      className="text-cyan-600 hover:text-cyan-800 underline"
                    >
                      {phone}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3 text-sm">
                  {site ? (
                    <a
                      href={site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-600 hover:text-cyan-800 hover:underline break-all underline"
                    >
                      {site.length > 40 ? `${site.substring(0, 40)}...` : site}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3 text-sm">
                  {email ? (
                    <a
                      href={`mailto:${email}`}
                      className="text-cyan-600 hover:text-cyan-800 hover:underline underline"
                    >
                      {email}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
