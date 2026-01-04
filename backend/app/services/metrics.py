from collections import Counter

def average(values: list[float]) -> float:
    return sum(values) / len(values)

def median(values: list[float]) -> float:
    sorted_values = sorted(values)
    n = len(sorted_values)
    mid = n // 2
    
    if n % 2 == 0:
        return (sorted_values[mid - 1] + sorted_values[mid]) / 2
    else:
        return sorted_values[mid]
    
def over_percentage(values: list[float], line:float) -> tuple[int, int, float]:
    over = [v for v in values if v > line]
    total = len(values)
    percentage = (len(over) / total) * 100
    return len(over), total, percentage 

def distribution(values: list[int], bucket_size: int = 5) -> dict[str, int]:
    bucket = Counter()
    
    for v in values:
        start = (v // bucket_size) * bucket_size
        label = f"{start}-{start + bucket_size - 1}"
        bucket[label] +=1
        
        return dict(bucket)