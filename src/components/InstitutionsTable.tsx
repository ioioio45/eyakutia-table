import { useNavigate } from "react-router-dom";
import { type Institution } from "../types/institution";
import { getContactInfo } from "../api/institutions";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

interface InstitutionsTableProps {
  institutions: Institution[];
  loading: boolean;
  searchQuery: string;
}

export default function InstitutionsTable({
  institutions,
  loading,
  searchQuery,
}: InstitutionsTableProps) {
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
    <div className="w-full">
      <table className="w-full table-fixed">
        <colgroup>
          <col className="w-[45%]" />
          <col className="w-[65%]" />
        </colgroup>
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Наименование
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Контакты
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {institutions.map((inst) => {
            const name = inst.ShortName || inst.FullName || "Без названия";
            const { phone, email, site, address } = getContactInfo(inst);

            let lastAddressPart = "";
            if (address) {
              const addressSplit = address.split(",");
              if (addressSplit.length >= 2) {
                lastAddressPart =
                  addressSplit[addressSplit.length - 2] +
                  "," +
                  addressSplit[addressSplit.length - 1];
              }
            }

            return (
              <tr
                key={inst.Id}
                onClick={() => navigate(`/view/${inst.Id}`)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4 text-sm text-gray-900 align-top break-words">
                  <span className="font-medium text-cyan-600 hover:text-blue-800 [overflow-wrap:break-word] [word-break:break-word]">
                    {name}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">
                  <div className="space-y-1 break-words">
                    {lastAddressPart && (
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                        <span>{lastAddressPart}</span>
                      </div>
                    )}
                    {phone && (
                      <div className="flex items-start">
                        <Phone className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                        <span>{phone}</span>
                      </div>
                    )}
                    {email && (
                      <div className="flex items-start">
                        <Mail className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="break-all">{email}</span>
                      </div>
                    )}
                    {site && (
                      <div className="flex items-start">
                        <Globe className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="break-all">
                          {site.substring(0, 30)}
                          {site.length > 30 ? "..." : ""}
                        </span>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
