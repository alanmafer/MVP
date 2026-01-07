import time
from scripts.fetch_player_stats import fetch_player

PLAYER_IDS = [
    2544,    # LeBron James
    201939,  # Stephen Curry
    1629029, # Luka Doncic
    203507,  # Giannis Antetokounmpo
    1629027, # Jayson Tatum
    1627732, # Joel Embiid
    1628983, # Shai Gilgeous-Alexander
    201142,  # Kevin Durant
    1626164, # Devin Booker
    203999, # Nikola Jovic
]

SLEEP_SECONDS = 1.5  # evita rate limit da NBA API


def main():
    print(f"Starting batch for {len(PLAYER_IDS)} players...\n")

    for idx, player_id in enumerate(PLAYER_IDS, start=1):
        print(f"[{idx}/{len(PLAYER_IDS)}] Processing player {player_id}")
        try:
            fetch_player(player_id)
        except Exception as e:
            print(f"❌ Error processing {player_id}: {e}")

        time.sleep(SLEEP_SECONDS)

    print("\nBatch completed.")


if __name__ == "__main__":
    main()
