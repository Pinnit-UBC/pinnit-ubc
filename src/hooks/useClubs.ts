import { useEffect, useState } from 'react';

const useClubs = (keywords: string[]) => {
  const [recommendedClubs, setRecommendedClubs] = useState<[string, number, number, string][]>([]);

  useEffect(() => {
    fetch('/api/getAllClubs')
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return;

        const clubs = data.map((club: any) => {
          const matchCount = keywords
            .map((k) => k.toLowerCase())
            .filter((keyword) =>
              [club.keywords, club.keywords_1, club.keywords_2]
                .flat()
                .filter((k: string | null) => k)
                .map((k: string) => k.toLowerCase())
                .includes(keyword)
            ).length;

          const followers = parseInt(club.followers.replace(/,/g, ''), 10) || 0;
          return [club.full_name, matchCount, followers, club.profile_pic];
        });

        setRecommendedClubs(clubs.filter(([_, matchCount]) => matchCount > 0));
      })
      .catch(() => setRecommendedClubs([]));
  }, [keywords]);

  return recommendedClubs;
};

export default useClubs;
