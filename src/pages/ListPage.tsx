import { useInstitutions } from "../hooks/useInstitutions";
import SearchBar from "../components/SearchBar";
import InstitutionsTable from "../components/InstitutionsTable";
import InstitutionsTableDesktop from "../components/InstitutionsTableDesktop";

interface ListPageProps {
  isMobile: boolean;
}

export default function ListPage({ isMobile }: ListPageProps) {
  const { filtered, loading, searchQuery, filterInstitutions } =
    useInstitutions();

  return (
    <>
      <div className=" mb-20">
        <div className="md:p-2">
          <SearchBar
            value={searchQuery}
            onChange={filterInstitutions}
            onClear={() => filterInstitutions("")}
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-600 p-2">
              Найдено: {filtered.length}
            </span>
            {searchQuery && (
              <button
                onClick={() => filterInstitutions("")}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Сбросить поиск
              </button>
            )}
          </div>
        </div>

        {isMobile ? (
          <InstitutionsTable
            institutions={filtered}
            loading={loading}
            searchQuery={searchQuery}
          />
        ) : (
          <InstitutionsTableDesktop
            institutions={filtered}
            loading={loading}
            searchQuery={searchQuery}
          />
        )}
      </div>
    </>
  );
}
